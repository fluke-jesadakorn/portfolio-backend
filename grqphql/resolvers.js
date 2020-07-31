const User = require('../mongoDBModels/user')

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

module.exports = resolvers