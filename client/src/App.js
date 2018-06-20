import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'; // this is where the redux store
import './App.css';
import NavBar from './components/layout/navbar';
import Landing from './components/layout/landidng';
import Footer from './components/layout/footer';
import Login from './components/auth/login';
import Register from './components/auth/register';
import appStore from './store/store';

class App extends Component {
    render() {
        return (
            <Provider store={appStore}>
                <BrowserRouter>
                    <div className="App">
                        <NavBar />
                        <Route exact path='' component={Landing} />
                        <div className="container">
                            <Route exact path='/login' component={Login} />
                            <Route exact path='/register' component={Register} />
                        </div>
                        <Footer />
                    </div>
                </BrowserRouter>
            </Provider>
        )
    }
}

export default App;
