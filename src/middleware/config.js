import path from "path";
import express from "express";
import graphqlHTTP from "express-graphql";
import passport from "passport";
import bodyParser from "body-parser";
import passportConfig from "./passport";
import graphqlSchema from "../graphql/schema";

const middlewareConfig = app => {
    // body parse
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    // config login passport
    app.use(passport.initialize());
    passportConfig(passport);

    //mount the graphql server to /graphql
    app.use(
        "/graphql",
        graphqlHTTP({
            schema: graphqlSchema,
            graphiql: true
        })
    );

    // render react
    if (process.env.NODE_ENV === "production") {
        app.use(express.static("client/build"));
        app.get("*", (req, res) => {
            res.sendFile(
                path.resolve(__dirname, "client", "build", "index.html")
            );
        });
    }
};

export default middlewareConfig;
