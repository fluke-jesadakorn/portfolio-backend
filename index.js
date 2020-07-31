const express = require('express')
const app = express()
const { ApolloServer, gql } = require('apollo-server-express')
// const { resolvers, typeDefs } = require('./schema/index')
const mongooose = require('mongoose')
require('dotenv').config
const User = require('./models/user')

const DB_USERNAME = process.env.DB_USERNAME
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME
const PORT = process.env.PORT || 7000

const createServer = async () => {
    try {
        await mongooose.connect(`mongodb://localhost:27017/test`, { useNewUrlParser: true, useUnifiedTopology: true })
            .then((e) => console.log(`MongoDB connected`))

        const resolvers = {
            Query: {
                me: (_parents, _args, _context, _info) => me,
                user: (_parents, args, _context, _info) => {
                    const id = args.id

                    const user = users.find(u => u.id === id)
                    return user
                },
                users: (_parents, _args, _context, _info) => users
            },
            Mutation: {
                signup: (_parents, args, _context, _info) => {
                    return User.create(args)
                }
            }
        }

        const typeDefs = gql`
            type Query {
                me: User!
                user(id: ID!): User
                users: [User]!
            }
          
            type Mutation {
                signup(name: String!, email: String!, password: String!): User
            }
          
            type User {
                id: ID!
                name: String!
                email: String!
                password: String!
            }
        `

        const server = new ApolloServer({
            typeDefs,
            resolvers
        })

        server.applyMiddleware({ app })

        app.listen({ port: PORT }, () => console.log(`
            Server running on localhost : ${PORT} ${server.graphqlPath}
        `))
    } catch (e) {
        console.error(e)
    }
}

createServer();