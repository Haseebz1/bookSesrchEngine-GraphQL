const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {

    Mutation: {
        addUser: async (parent, args) => {
          const user = await User.create(args);
          const token = signToken(user);
    
          return { token, user };
        },
    },  

    Query: {
        me: async (parent, args, context) => {
          if (context.user) {
            const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');
    
            return userData;
          }
    
          throw AuthenticationError;
        },
      },
};

module.exports = resolvers;