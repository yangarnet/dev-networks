import { expect } from "chai";
import { setCurrentLoggedInUser } from "../authAction";
import { AUTH_ACTION } from "../types";

describe("test set current logged in user", () => {
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
