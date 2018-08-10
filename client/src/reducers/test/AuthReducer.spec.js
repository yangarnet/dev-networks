import { AUTH_ACTION } from '../../action/types';
import { authReducer } from '../authReducer';


describe('Unit Test for Authentication Reducer', ()=>{

    let initState;

    beforeEach(() => {
        initState = {
            isAuthenticated: false,
            user: {},
            loading: false
        };
    });

    it('should set loading to be true when receiving USER_LOGIN_PENDING or USER_LOGIN_REJECT', () => {

        let state = initState;

        let nextStateV1 = authReducer(state, {type: AUTH_ACTION.USER_LOGIN_PENDING});
        expect(nextStateV1.loading).to.be.true;
        expect(state.loading).to.be.false;
        expect(state.user).to.be.empty;
        expect(state.isAuthenticated).to.be.false;

        // dispatch another action, verifying the reducer is pure
        let nextStateV2 = authReducer(nextStateV1, {type: AUTH_ACTION.USER_LOGIN_REJECT})
        expect(nextStateV2.loading).to.be.false;
        expect(nextStateV1.loading).to.be.true;
        expect(nextStateV1.user).to.be.empty;
        expect(nextStateV1.isAuthenticated).to.be.false;
    });

    it('should set user as autenticated when receiving SET_CURRENT_USER', () => {

        let nextStateV1 = authReducer(initState,
            {
                type: AUTH_ACTION.SET_CURRENT_USER,
                payload: {isAuthenticated: true, user: {name: 'test'}, loading: false}
            }
        );

        expect(nextStateV1.loading).to.be.false;
        expect(nextStateV1.user).to.be.not.empty;

        //pure function, no change to pre state
        expect(initState.user).to.be.empty;
        expect(initState.isAuthenticated).to.be.false;
    });

});
