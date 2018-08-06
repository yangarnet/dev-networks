import React from "react";
import { mount } from "enzyme";
import { MemoryRouter as Router, withRouter } from "react-router-dom";
import Login from "../Login";
import TextFieldGroup from "../../../common/TextFieldGroup";

let wrapped;

describe("User Login", () => {
    beforeEach(() => {
        const loginProps = {
            clearError: () => {},
            auth: { isAuthenticated: false },
            userLogin: () => {},
            errors: {}
        };
        wrapped = mount(
            <Router>
                <Login {...loginProps} />
            </Router>
        );
    });

    afterEach(() => {
        wrapped.unmount();
    });

    it("should load login component properly", () => {
        expect(wrapped.find("div.login")).to.have.length(1);
        const textFieldGroups = wrapped.find(TextFieldGroup);
        expect(textFieldGroups).to.have.length(2);
        expect(textFieldGroups.at(0).prop("name")).to.be.equal("email");
        expect(textFieldGroups.at(1).prop("name")).to.be.equal("password");
    });

    it("should allow user keyboard typing", () => {
        const textFieldGroups = wrapped.find(TextFieldGroup);

        textFieldGroups.at(0).simulate("change", {
            target: { name: "email", value: "test123@gmail.com" }
        });
        textFieldGroups.at(1).simulate("change", {
            target: { name: "password", value: "testpassword" }
        });

        // for the dom to get updated
        wrapped.update();
        // more to do here
    });

    it("should allow user submit the login form", () => {
        const textFieldGroups = wrapped.find(TextFieldGroup);

        textFieldGroups.at(0).simulate("change", {
            target: { name: "email", value: "test123@gmail.com" }
        });
        textFieldGroups.at(1).simulate("change", {
            target: { name: "password", value: "testpassword" }
        });

        wrapped.find("form").simulate("submit");
        // more to do here
    });
});
