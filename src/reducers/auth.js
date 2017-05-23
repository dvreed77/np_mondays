let authDefaultState = {
  errors: {},
  authenticating: true,
  resettingPassword: false,
  username: null,
  token: null
}
function auth(state = authDefaultState, action) {
  switch (action.type) {
    case 'AUTH_START':
      return Object.assign(
        {},
        state,
        {
          authenticating: true
        }
      )
    case 'AUTH_ERROR':
      return Object.assign(
        {},
        state,
        {
          authenticating: false,
          errors: action.errors || {}
        }
      )
    case 'AUTH_SUCCESS':
      return Object.assign(
        {},
        state,
        {
          username: action.username,
          country: action.country,
          token: action.token,
          authenticating: false
        }
      )
    case 'LOGIN_START':
      return Object.assign(
        {},
        state,
        {
          authenticating: true
        }
      )
    case 'LOGIN_ERROR':
      return Object.assign(
        {},
        state,
        {
          authenticating: false,
          errors: action.errors
        }
      )
    case 'LOGIN_SUCCESS':
      return Object.assign(
        {},
        state,
        {
          token: action.token,
          username: action.username,
          country: action.country,
          authenticating: false,
          errors: {}
        }
      )
    case 'LOGOUT_START':
      return Object.assign(
        {},
        state,
        {
          token: null,
          username: null,
          errors: {}
        }
      )
    case 'LOGOUT_ERROR':
      return Object.assign(
        {},
        state,
        {
          errors: action.errors
        }
      )
    case 'LOGOUT_SUCCESS':
      return Object.assign(
        {},
        state,
        {
          token: null,
          username: null,
          errors: {}
        }
      )
    case 'REGISTRATION_START':
      return Object.assign(
        {},
        state,
        {
          authenticating: true
        }
      )
    case 'REGISTRATION_ERROR':
      console.log('REGISTRATION_ERROR', action)
      return Object.assign(
        {},
        state,
        {
          authenticating: false,
          errors: action.errors
        }
      )
    case 'REGISTRATION_SUCCESS':
      return Object.assign(
        {},
        state,
        {
          token: action.token,
          username: action.username,
          authenticating: false,
          errors: {}
        }
      )
    case 'RESET_PASSWORD_START':
      return Object.assign(
        {},
        state,
        {
          resettingPassword: true
        }
      )
    case 'RESET_PASSWORD_SUCCESS':
      return Object.assign(
        {},
        state,
        {
          resettingPassword: false,
          errors: {}
        }
      )
    case 'RESET_PASSWORD_ERROR':
      return Object.assign(
        {},
        state,
        {
          resettingPassword: false
        }
      )
    case 'CONFIRM_PASSWORD_RESET_START':
      return Object.assign(
        {},
        state,
        {
          resettingPassword: true
        }
      )
    case 'CONFIRM_PASSWORD_RESET_SUCCESS':
      return Object.assign(
        {},
        state,
        {
          resettingPassword: false
        }
      )
    case 'CONFIRM_PASSWORD_RESET_ERROR':
      return Object.assign(
        {},
        state,
        {
          resettingPassword: false,
          errors: action.errors
        }
      )

    case "@@router/LOCATION_CHANGE":
      return Object.assign(
        {},
        state,
        {
          errors: {}
        }
      )

    default:
      return state
  }
}

export {
  auth
}