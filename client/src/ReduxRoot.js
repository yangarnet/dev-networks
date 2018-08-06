import React from "react";
import { Provider } from "react-redux";
import appStore from "./store/store";

// make a reusable react redux connector, can for later test case
const ReduxRoot = ({ children, initialState = {} }) => (
    <Provider store={appStore(initialState)}>{children}</Provider>
);

export default ReduxRoot;
