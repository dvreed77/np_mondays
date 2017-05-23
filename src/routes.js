import React from 'react'
import {Route, IndexRoute} from 'react-router'
import { auth } from './actions'
import { UserAuthWrapper } from 'redux-auth-wrapper'
import { routerActions } from 'react-router-redux'


function requireAuth(nextState, replace) {

  replace({
    pathname: '/auth/login/',
  })


  console.log('nextState', nextState)
  auth.isAuthenticated(res => {
    console.log('isAuthenticated Response', res)
    if (!res) {
      console.log('not authenticated', replace)
      replace({
        pathname: '/auth/login/',
        // state: {nextPathname: nextState.location.pathname}
      })
    }
  })
}


const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => {
    console.log(state)
    return state.auth

  }, // how to get the user state,
  predicate:auth => auth.username,
  failureRedirectPath: '/auth/login',
  authenticatingSelector: state => state.auth.authenticating,
  redirectAction: routerActions.replace, // the redux action to dispatch for redirect
  wrapperDisplayName: 'UserIsAuthenticated' // a nice name for this auth check
})

const Authenticated = UserIsAuthenticated((props) => React.cloneElement(props.children, props))


export default (
  <Route path="/" component={App}>
    <IndexRoute component={WelcomePage}/>
    <Route component={Authenticated}>
      <Route path="foo" component={WelcomePage} />
      <Route path="bar" component={WelcomePage} />
    </Route>
    <Route path="/rss"
           component={RSS}
    />
    <Route path="/data"
           component={UserIsAuthenticated(Data)}
    />
    <Route path="/train"
           component={UserIsAuthenticated(PositionPage)}
    />
    <Route path="/auth/register"
           component={RegistrationPage}/>
    <Route path="/auth/password/reset"
           component={ResetPasswordPage}/>
    <Route path="/auth/password/reset/email"
           component={ResetPasswordSentPage}/>
    <Route path="/auth/password/reset/confirm/:uid/:token"
           component={ConfirmPasswordResetPage}/>
    <Route path="/auth/login"
           component={LoginPage}/>
    <Route path="/auth/logout"
           component={LogoutPage}/>
  </Route>
)
