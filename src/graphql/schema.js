import { makeExecutableSchema } from 'graphql-tools';
import resolvers from '../graphql/resolvers/resolver';

// be sure the getUserById  and updateUser are consistent with resovler definiton
// not sure why for now, I will figure it for sure
const typeDefs = `
    type User {
        name: String
        email: String
    }

    type Query {
        getUserById(id: ID!): User
    }

    input UserInput {
        id: String
        name: String
        email: String
    }

    type Mutation {
        updateUser(input: UserInput): User
    }`;

const graphqlSchema = makeExecutableSchema({ typeDefs, resolvers });

export default graphqlSchema;
