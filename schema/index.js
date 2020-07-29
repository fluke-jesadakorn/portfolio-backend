const { gql } = require('apollo-server-express')

const resolvers = {
    Query: {
        me: (_parents, context, args, _info) => {
            return;
        }
    }
}
const typeDefs = gql`
    type Query {
        me: User!
        users: [User]!
        user(id:ID!): User!
    }
    type User {
        id:ID!
        name:String!
    }
`

const Mutation = {
    Query: () => {
        return "hello"
    }
}

module.exports = { Mutation, typeDefs, resolvers }