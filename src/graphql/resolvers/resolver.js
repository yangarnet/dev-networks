import user from '../../models/user';

const resolvers = {
    Query: {
        async getUserById(root, { id }) {
            try {
                return await user.findById(id);
            } catch (err) {
                return null;
            }
        }
    },
    Mutation: {
        async updateUser(root, { input }) {
            try {
                return user.findOneAndUpdate({ _id: input.id }, { $set: input }, { new: true });
            } catch (error) {
                return null;
            }
        }
    }
};

export default resolvers;
