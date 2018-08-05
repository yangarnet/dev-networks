import React from "react";
import { shallow, mount } from "enzyme";
import sinon from "sinon";
import App from "./App";
import Footer from "./components/presentation/layout/Footer";
import NavBar from "./components/presentation/layout/NavBar";

describe("test cases for APP", () => {
    it("should render the react APP", () => {
        const wrapped = shallow(<App />);

        expect(wrapped).to.contain(<NavBar />, <Footer />);

        // at(index) will tell which level of element to check
        // when you see error: Method “props” is only meant to be run on a single node. 2 found instead
        // it means that the search returning multiple nodes(elements)
        expect(wrapped.find("div").at(0)).to.have.className("App");
        expect(wrapped.find("div").at(1)).to.have.className("container");
        expect(wrapped).to.have.html().to.be.not.empty;
    });

    it("should mount the footer", () => {
        const wrapped = mount(<Footer />);
        expect(wrapped.find(Footer)).to.have.lengthOf(1);
        expect(wrapped.html()).to.not.empty;
        expect(wrapped.html()).to.contain(`Copyright © 2018 Dev Connector`);
        wrapped.unmount();
    });
});
