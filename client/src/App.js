import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux'; // this is where the redux store
import './App.css';
import NavBar from './components/presentation/layout/navbar';
import Landing from './components/presentation/layout/landing';
import Footer from './components/presentation/layout/footer';
import UserRegisterContainer from './components/containers/user-register';
import UserLogin from './components/containers/user-login';
import appStore from './store/store';

class App extends Component {
    render() {
        //{/*the Provider here provides redux store to the app*/ }
        return (
            <Provider store={appStore}>
                <BrowserRouter>
                    <div className="App">
                        <NavBar />
                        <Route exact path='' component={Landing} />
                        <div className="container">
                            <Route exact path='/login' component={UserLogin} />
                            <Route exact path='/register' component={UserRegisterContainer} />
                        </div>
                        <Footer />
                    </div>
                </BrowserRouter>
            </Provider >
        )
    }
}

export default App;
