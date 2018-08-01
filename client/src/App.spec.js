import React from "react";
import { shallow, mount } from "enzyme";
import chai, { expect } from "chai";
import sinon from "sinon";
import App from "./App";
import Landing from "./components/presentation/layout/Landing";

describe("test cases for APP", () => {
    it("the APP should be rendered without crashing", () => {
        sinon.spy(Landing.prototype, "componentDidMount");
        const wrapped = mount(<App />);

        console.log("wrapper", wrapped);
        expect(Landing.prototype.componentDidMount).to.have.property(
            "callCount",
            1
        );
    });
});
