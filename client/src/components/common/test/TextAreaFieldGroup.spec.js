import React from "react";
import { mount } from "enzyme";
import TextAreaFieldGroup from "../TextAreaFieldGroup";
import { wrap } from "module";

let wrapped;

describe("TextAreaFieldGroup unit test", () => {
    beforeEach(() => {
        const props = {
            name: "comment",
            placeholder: "input your comment here",
            onChange: () => {},
            errors: {}
        };

        wrapped = mount(<TextAreaFieldGroup {...props} />);
    });

    afterEach(() => {
        wrapped.unmount();
    });

    it("should render TextAreaFieldGroup", () => {
        expect(wrapped.find("div.form-group")).to.have.lengthOf(1);
        expect(wrapped.find("textarea")).to.have.lengthOf(1);
        const props = wrapped.find("textarea").props();
        expect(props.name).to.be.equal("comment");
        expect(props.onChange).to.be.a("function");
        expect(props.placeholder).to.be.equal("input your comment here");

        expect(wrapped.props().errors).to.be.an("object");
        expect(wrapped.props().errors).to.be.empty;
    });

    it("should displace error message", () => {
        // set the props with new value
        wrapped.setProps({
            errors: { email: "your input email is invalid" },
            name: "email"
        });

        wrapped.update();

        const props = wrapped.props();
        expect(props.errors).to.be.an("object");
        expect(props.errors).to.be.not.empty;
        expect(props.errors.email).to.be.equal("your input email is invalid");
        expect(wrapped.find("div.invalid-feedback")).to.have.lengthOf(1);
        expect(wrapped.find("div.invalid-feedback").text()).to.be.equal(
            "your input email is invalid"
        );
    });
});
