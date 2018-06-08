import graphqlHTTP from 'express-graphql';
import passport from 'passport';
import bodyParser from 'body-parser';
import passportConfig from './passport';
import graphqlSchema from '../graphql/schema';

const middlewareConfig = app => {
    // body parse
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    // config login passport
    app.use(passport.initialize());
    passportConfig(passport);

    //mount the graphql server to /graphql
    app.use('/graphql', graphqlHTTP({
        schema: graphqlSchema,
        graphiql: true
    }));
};

export default middlewareConfig;
