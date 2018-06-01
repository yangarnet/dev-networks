import graphqlHTTP from 'express-graphql';
import passport from 'passport';
import bodyParser from 'body-parser';
import passportConfig from '../env/passport';
import graphqlSchema from '../../graphql/schema';

const configMiddleware = app => {
    // resovler
    const root = { friend : () => {
        return {
            "id": 123,
            "firstName":"Manny",
            "lastName":"kelly",
            "gender":"male",
            "language":"en",
            "emails": "a@gmail.com"
        };
    }};
    // body parse
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    // config login passport
    app.use(passport.initialize());
    passportConfig(passport);

    //mount the graphql server to /graphql
    app.use('/graphql', graphqlHTTP({
        schema: graphqlSchema,
        rootValue: root,
        graphiql: true
    }));
};

export default configMiddleware;
