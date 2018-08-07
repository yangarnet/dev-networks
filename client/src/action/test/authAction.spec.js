import { expect } from "chai";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import moxios from "moxios";
import { createMemoryHistory } from "history";
import { setCurrentLoggedInUser, registerUser, userLogin } from "../authAction";

import { AUTH_ACTION, CLEAR_ERRORS } from "../types";
import {
    registerUserSuccess,
    registerUserFailure,
    userLoginSuccess,
    userNotFound,
    userPasswordInvalid
} from "./registerUserMock";

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
        expect(action).to.have.property("type", AUTH_ACTION.SET_CURRENT_USER);
        expect(action.payload).to.be.not.undefined;
        expect(action.payload).to.be.deep.equal(decoded);
    });
});

describe("Async Auth action unit test", () => {
    const middleware = [thunk];
    const mockStore = configureMockStore(middleware);

    beforeEach(() => {
        moxios.install();
    });
    afterEach(() => {
        moxios.uninstall();
    });

    describe("[authentication Actions - User Register]", () => {
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

    describe("[user login]", () => {
        it("should dispatch USER_LOGIN_RESOLVE", async () => {
            // stub request result
            moxios.stubRequest("/api/user/login", {
                status: 200,
                response: userLoginSuccess()
            });

            // user login
            const login = {
                email: "test01@gmail.com",
                password: "passw0rd"
            };
            // expected actions
            const expectedActions = [
                { type: "USER_LOGIN_PENDING" },
                { type: "SET_CURRENT_USER" },
                { type: "USER_LOGIN_RESOLVE" }
            ];
            const store = mockStore({});

            // dispatch user login
            await store.dispatch(userLogin(login));

            const actions = store.getActions();

            expect(actions.map(action => action.type)).to.deep.equal(
                expectedActions.map(action => action.type)
            );
            expect(
                actions.find(
                    action => action.type === AUTH_ACTION.SET_CURRENT_USER
                )
            ).to.be.not.null;

            expect(
                actions.find(
                    action => action.type === AUTH_ACTION.SET_CURRENT_USER
                ).payload
            ).to.be.not.null;
        });

        it("should dispatch USER_LOGIN_REJECT when user not found", async () => {
            // stub request result
            moxios.stubRequest("/api/user/login", {
                status: 404,
                response: userNotFound()
            });

            //login user
            const login = {
                email: "test01@gmail.com",
                password: "passw0rd"
            };

            // expected actions
            const expectedActions = [
                { type: "USER_LOGIN_PENDING" },
                {
                    type: "USER_LOGIN_REJECT",
                    payload: { email: "User not found" }
                }
            ];

            // mock store
            const store = mockStore({});
            // dispatch user login
            await store.dispatch(userLogin(login));
            const actions = store.getActions();

            expect(actions).to.be.not.null;
            expect(actions.map(action => action.type)).to.deep.equal(
                expectedActions.map(action => action.type)
            );
            expect(
                actions.find(
                    action => action.type === AUTH_ACTION.USER_LOGIN_REJECT
                )
            ).to.be.not.undefined;

            expect(
                actions.find(
                    action => action.type === AUTH_ACTION.USER_LOGIN_REJECT
                ).payload
            ).to.be.deep.equal(
                expectedActions.find(
                    action => action.type === AUTH_ACTION.USER_LOGIN_REJECT
                ).payload
            );
        });

        it("should dispatch USER_LOGIN_REJECT when user password invalid", async () => {
            // stub request result
            moxios.stubRequest("/api/user/login", {
                status: 400,
                response: userPasswordInvalid()
            });

            //login user
            const login = {
                email: "test01@gmail.com",
                password: "passw0rd00"
            };

            // expected actions
            const expectedActions = [
                { type: "USER_LOGIN_PENDING" },
                {
                    type: "USER_LOGIN_REJECT",
                    payload: { password: "invalid password" }
                }
            ];

            // mock store
            const store = mockStore({});
            // dispatch user login
            await store.dispatch(userLogin(login));
            const actions = store.getActions();

            expect(actions).to.be.not.null;
            expect(actions.map(action => action.type)).to.deep.equal(
                expectedActions.map(action => action.type)
            );
            expect(
                actions.find(
                    action => action.type === AUTH_ACTION.USER_LOGIN_REJECT
                )
            ).to.be.not.undefined;

            expect(
                actions.find(
                    action => action.type === AUTH_ACTION.USER_LOGIN_REJECT
                ).payload
            ).to.be.deep.equal(
                expectedActions.find(
                    action => action.type === AUTH_ACTION.USER_LOGIN_REJECT
                ).payload
            );
        });
    });
});
