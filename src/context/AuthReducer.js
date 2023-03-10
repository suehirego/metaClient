/* eslint-disable default-case */
/* eslint-disable no-duplicate-case */
const AuthReducer = (state, action) => {
      switch (action.type) {
            case 'LOGIN_START':
                  return {
                        user: null,
                        isFetching: true,
                        error: false,
                  };
            case 'LOGIN_SUCCESS':
                  return {
                        user: action.payload,
                        isFetching: false,
                        error: false,
                  };
            case 'LOGIN_FAILURE':
                  return {
                        user: null,
                        isFetching: false,
                        error: false,
                  };
            case "LOGOUT":
                  return {
                        user: null,
                        loading: false,
                        error: null,
                  };
            //ADDING & REMOVING FRIENDS
            case 'FOLLOW':
                  return {
                        ...state,
                        user: {
                              ...state.user,
                              followings: [...state.user.followings, action.payload],
                        },
                  };
            case 'UNFOLLOW':
                  return {
                        ...state,
                        user: {
                              ...state.user,
                              followings: state.user.followings.filter(
                                    (following) => following !== action.payload
                              ),
                        },
                  };

            //UPDATING USER
            case 'UPDATE_START':
                  return {
                        ...state,
                        isFetching: true,
                  };
            case 'UPDATE_SUCCESS':
                  return {
                        ...state,
                        user: {...state.user},
                        isFetching: false,
                        error: false,
                  };
            case 'UPDATE_FAILURE':
                  return {
                        user: state.user,
                        isFetching: false,
                        error: false,
                  };
            default:
                  return state;

      }
}

export default AuthReducer;