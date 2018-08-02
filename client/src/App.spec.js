import React from "react";
import { shallow } from "enzyme";
import chai, { expect } from "chai";
import sinon from "sinon";
import App from "./App";
import Footer from "./components/presentation/layout/Footer";
import Landing from "./components/presentation/layout/Landing";

describe("test cases for APP", () => {
    it("the APP should be rendered without crashing", () => {
        const wrapped = shallow(<App />);
        const footer = wrapped.find(Footer);
        expect(wrapped.find(Footer)).to.have.lengthOf(1);
        expect(footer.html()).to.not.empty;
        expect(footer.html()).to.contain(`Copyright © 2018 Dev Connector`);
    });
});
