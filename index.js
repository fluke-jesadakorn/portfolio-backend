const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')
const { resolvers, typeDefs } = require('./schema/index')
const mongooose = require('mongoose')
require('dotenv').config
const DB_USERNAME = process.env.DB_USERNAME
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME
const PORT = process.env.PORT

const createServer = async () => {
    try {
        await mongooose.connect(`mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@portfolio.4a0sq.gcp.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`, { useUnifiedTopology: true },)
    const server = new ApolloServer({
        typeDefs,
        resolvers
    })

    const app = express()

    server.applyMiddleware({ app })

    app.listen(PORT, () => console.log(`
            Server running on localhost : ${PORT} ${server.graphqlPath}
        `))
} catch (e) {
    console.error(e)
}
}

createServer();