export const LoginStart = (userDetails) => ({
      type: "LOGIN_START",
});

export const LoginSuccess = (user) => ({
      type: "LOGIN_SUCCESS",
      payload: user,
});

export const LoginFailure = () => ({
      type: "LOGIN_FAILURE",
});

//LOGOUT
export const Logout = () => ({
      type: "LOGOUT",
});

//UPDATING USER
export const UpdateStart = (userDetails) => ({
      type: "UPDATE_START",
});

export const UpdateSuccess = (user) => ({
      type: "UPDATE_SUCCESS",
      payload: user,
});

export const UpdateFailure = () => ({
      type: "LOGIN_FAILURE",
});

//ADDING & REMOVING FRIENDS
export const Follow = (userId) => ({
      type: "FOLLOW",
      payload: userId,
});

export const UnFollow = (userId) => ({
      type: "UNFOLLOW",
      payload: userId,
});