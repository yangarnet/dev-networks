import React from "react";
import { mount } from "enzyme";
import InputGroup from "../InputGroup";

let wrapped;
describe("InputGroup Component", () => {
    beforeEach(() => {
        const email = "email";
        const errors = {};
        wrapped = mount(
            <InputGroup
                placeholder={email}
                name={email}
                icon="your-name"
                onChange={e => {
                    console.log(e.target.value);
                }}
                errors={errors}
            />
        );
    });

    afterEach(() => {
        wrapped.unmount();
    });

    it("should render InputGroup", () => {
        expect(wrapped.find("span.input-group-text")).to.have.lengthOf(1);
        expect(
            wrapped.find("span.input-group-text").children("i")
        ).to.have.length(1);

        const input = wrapped.find("input");
        expect(input).to.be.not.undefined;
        expect(input.length).to.be.eq(1);
        expect(input.props().name).to.be.equal("email");
        expect(input.prop("placeholder")).to.be.equal("email");
        expect(wrapped.find("div.invalid-feedback")).to.have.length(0);
    });

    it("should render errror information", () => {
        let errors = { email: "the email address aleady used" };
        wrapped.setProps({ errors: errors });

        expect(wrapped.find("div.invalid-feedback")).to.have.length(1);
        expect(wrapped.find("div.invalid-feedback").html()).to.contain(
            "the email address aleady used"
        );
    });
});
