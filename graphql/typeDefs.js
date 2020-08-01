const { gql } = require("apollo-server-express")
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
module.exports = typeDefs