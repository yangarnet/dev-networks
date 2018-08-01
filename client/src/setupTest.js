process.env.ENV = "dev";
process.env.NODE_ENV = "test";

require("ignore-styles");

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const chai = require("chai");
const sinonChai = require("sinon-chai");
const chaiAsPromised = require("chai-as-promised");
const chaiString = require("chai-string");
const map = require("bluebird").map;
const Enzyme = require("enzyme");
const Adapter = require("enzyme-adapter-react-16");

Enzyme.configure({ adapter: new Adapter() });

chai.use(chaiAsPromised);
chai.use(sinonChai);
chai.use(chaiString);

global.expect = chai.expect;
const url = "http://localhost";
const { document } = new JSDOM("", { url }).window;
global.document = document;
global.window = document.defaultView;
Object.keys(document.defaultView).forEach(property => {
    if (typeof global[property] === "undefined") {
        global[property] = document.defaultView[property];
    }
});

global.navigator = {
    userAgent: "node.js"
};

global.testCases = (cases, test) => () => {
    return map(
        cases,
        (testCase, i) => {
            return Promise.resolve(testCase)
                .then(test)
                .catch(err => {
                    err.message = `TestCase ${i}: ${err.message}`;
                    throw err;
                });
        },
        { concurrency: 1 }
    );
};

global.before = global.beforeAll ? beforeAll : undefined;
global.after = global.afterAll ? afterAll : undefined;
