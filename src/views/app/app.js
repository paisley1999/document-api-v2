import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {authActions, getAuth} from 'src/auth';
import Header from '../components/header';
import RequireAuthRoute from '../components/require-auth-route';
import RequireUnauthRoute from '../components/require-unauth-route';
import SignInPage from '../pages/sign-in';
import TasksPage from '../pages/tasks';
import ProductPage from "../pages/products/products-page";
import ApiListPage from "../pages/apis/api-list-page";

const App = ({authenticated, signOut}) => (
    <div>
        <Header
            authenticated={authenticated}
            signOut={signOut}
        />

        <main>
            <RequireAuthRoute authenticated={authenticated} exact path="/" component={ProductPage}/>
            <RequireAuthRoute authenticated={authenticated} exact path="/api/:id" component={ApiListPage}/>
            <RequireAuthRoute authenticated={authenticated} exact path="/tasks" component={TasksPage}/>
            <RequireUnauthRoute authenticated={authenticated} path="/sign-in" component={SignInPage}/>
        </main>
    </div>
);

App.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    signOut: PropTypes.func.isRequired
};


//=====================================
//  CONNECT
//-------------------------------------

const mapStateToProps = getAuth;

const mapDispatchToProps = {
    signOut: authActions.signOut
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(App)
);
