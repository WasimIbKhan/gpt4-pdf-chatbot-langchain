const initialState = {
    isAuthenticated: false,
    token: null,
    error: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          isAuthenticated: true,
          token: action.payload,
        };
      case 'LOGIN_FAILURE':
        return {
          ...state,
          isAuthenticated: false,
          error: action.payload,
        };
        case 'USER_LOGOUT':
            return {};
      default:
        return state;
    }
  };
  
  export default authReducer;
  