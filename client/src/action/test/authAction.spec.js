import { expect } from "chai";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import moxios from "moxios";
import { createMemoryHistory } from "history";
import reduxPromise from "redux-promise";
import { setCurrentLoggedInUser, registerUser } from "../authAction";

import { AUTH_ACTION, CLEAR_ERRORS } from "../types";
import { registerUserSuccess, registerUserFailure } from "./registerUserMock";

describe("Auth action unit test", () => {
    describe("[Sync authentication Action]", () => {
        it("should return correct action type", () => {
            const action = setCurrentLoggedInUser();
            expect(action).to.have.property("type");
            expect(action.type).to.be.eq(AUTH_ACTION.SET_CURRENT_USER);
            expect(action.payload).to.be.undefined;
        });

        it("should return correct payload", () => {
            const decoded = { user: "abc", email: "abc@gmail.com" };

            const action = setCurrentLoggedInUser(decoded);

            expect(action).to.be.not.null;
            expect(action).to.have.property(
                "type",
                AUTH_ACTION.SET_CURRENT_USER
            );
            expect(action.payload).to.be.not.undefined;
            expect(action.payload).to.be.deep.equal(decoded);
        });
    });

    describe("[Async authentication Actions - User Register]", () => {
        const middleware = [thunk, reduxPromise];
        const mockStore = configureMockStore(middleware);

        beforeEach(() => {
            moxios.install();
        });
        afterEach(() => {
            moxios.uninstall();
        });

        it("should dispatch USER_REGISTER_RESOLVE after success", async () => {
            // 1: set stub the response for the given url
            moxios.stubRequest("/api/user/register", {
                status: 200,
                response: JSON.stringify(registerUserSuccess())
            });

            // 2: set expected actions
            const expectedActions = [
                { type: AUTH_ACTION.USER_REGISTER_PENDING },
                { type: CLEAR_ERRORS },
                {
                    type: AUTH_ACTION.USER_REGISTER_RESOLVE,
                    payload: JSON.stringify(registerUserSuccess())
                }
            ];

            // 3: const store = mockStore({});
            const store = mockStore({});

            // 4: store dispatch the action
            const newUser = {
                name: "test01",
                email: "test01@gmail.com",
                password: "password",
                confirmedPassword: "password"
            };

            // 5: kick off user regiester action
            const history = createMemoryHistory("/login");
            await store.dispatch(registerUser(newUser, history));

            // 6: now get the resulted action
            const dispatchedActions = store.getActions();
            const actionTypes = dispatchedActions.map(action => action.type);

            // 7: test the result with expected result
            expect(actionTypes).to.deep.equal(
                expectedActions.map(action => action.type)
            );

            expect(
                dispatchedActions.filter(
                    action => action.type === AUTH_ACTION.USER_REGISTER_RESOLVE
                ).payload
            ).to.deep.equal(
                expectedActions.filter(
                    action => action.type === AUTH_ACTION.USER_REGISTER_RESOLVE
                ).payload
            );
        });

        it("should dispatch USER_REGISTER_REJECT", async () => {
            // 1: stub the reponse
            moxios.stubRequest("/api/user/register", {
                status: 400,
                response: JSON.stringify(registerUserFailure())
            });

            // 2: set expected response
            const expectedActions = [
                { type: AUTH_ACTION.USER_REGISTER_PENDING },
                { type: CLEAR_ERRORS },
                {
                    type: AUTH_ACTION.USER_REGISTER_REJECT,
                    payload: JSON.stringify(registerUserFailure())
                }
            ];

            // 3: new user to register
            const newUser = {
                name: "test01",
                email: "test01@gmail.com",
                password: "password",
                confirmedPassword: "password"
            };

            // 3: mock the store
            const store = mockStore({});

            // 4: dispatch user register
            const history = createMemoryHistory("/login");
            await store.dispatch(registerUser(newUser, history));

            const actions = store.getActions();
            const actionTypes = actions.map(action => action.type);

            expect(actionTypes).to.deep.equal(
                expectedActions.map(action => action.type)
            );

            expect(
                actions.filter(
                    action => action.type === AUTH_ACTION.USER_REGISTER_REJECT
                ).payload
            ).to.deep.equal(
                expectedActions.filter(
                    action => action.type === AUTH_ACTION.USER_REGISTER_REJECT
                ).payload
            );
        });
    });
});
