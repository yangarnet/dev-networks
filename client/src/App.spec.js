import React from 'react';
import ReactDOM from 'react-dom';
import {expect, assert} from 'chai';
import App from './App';


describe('test cases for APP', ()=>{
    it('the APP should be rendered without crashing', ()=>{
        const div = document.createElement('section');
        ReactDOM.render(<App/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});
