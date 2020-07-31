const express = require('express')
const app = express()
const mongooose = require('mongoose')
const { ApolloServer } = require('apollo-server-express')
const typeDefs = require("./grqphql/typeDefs")
const resolvers = require('./grqphql/resolvers')
require('dotenv').config

const PORT = process.env.PORT || 7000

const createServer = async () => {
    try {
        await mongooose.connect(`mongodb://localhost:27017/test`, { useNewUrlParser: true, useUnifiedTopology: true })
            .then((_e) => console.log(`MongoDB connected`))

        const server = new ApolloServer({
            typeDefs,
            resolvers
        })

        server.applyMiddleware({ app })

        app.listen({ port: PORT }, () => console.log(`
            Server running on http://localhost : ${PORT} ${server.graphqlPath}
        `))
    } catch (e) {
        console.error(e)
    }
}

createServer();