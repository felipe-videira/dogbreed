export const AUTH_TYPES = {
  RESTORE_TOKEN: 'RESTORE_TOKEN',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT',
}

export const authReducer = (prevState, action) => {
  switch (action.type) {
    case AUTH_TYPES.RESTORE_TOKEN:
      return {
        ...prevState,
        token: action.data,
        loading: false,
      };
    case AUTH_TYPES.SIGN_IN:
      return {
        ...prevState,
        token: action.data,
      };
    case AUTH_TYPES.SIGN_OUT:
      return {
        ...prevState,
        token: null,
      };
  }
}
