const User = require('../mongoDBModels/user')

const resolvers = {
    Query: {
        me: (_parents, _args, _context, _info) => User.findOne({ _id: "5f2472ea5eb0b523409639ff" }),
        user: (_parents, args, _context, _info) => {
            console.log(args)
            return User.findOne({ _id: args.id })
        },
        users: (_parents, _args, _context, _info) => User.find()
    },
    Mutation: {
        signup: (_parents, args, _context, _info) => {
            return User.create(args)
        }
    }
}

module.exports = resolvers