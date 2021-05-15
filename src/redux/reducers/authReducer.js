import {userTypes} from '.././actions/types';
import jwt_decode from 'jwt-decode';

const validCredentials = () =>{
  const token = localStorage.getItem('token');
  console.log(token);
  if (token === null) return false;
  try {
    const data = jwt_decode(token);
    return true;
  } catch(error) {
    return false;
  }
}
const initialState = {
    isAuthenticated: validCredentials(),
    name: validCredentials() === false ? '' : jwt_decode(localStorage.getItem('token')).name
};

export default function authentication(state=initialState, action){
  switch (action.type) {
    case userTypes.USERS_LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        name: action.name
      };
    case userTypes.GET_INFO:
      return{
        ...state,
        score: action.score
      }
    case userTypes.GET_USER_CHALLENGES:
      return{
        ...state,
        userChallenges: action.userChallenges
      }
    case userTypes.GET_USERS:
      return{
        ...state,
        users: action.users
      }
    case userTypes.USERS_LOGIN_ERROR:
      return {};
    case userTypes.USERS_LOGOUT:
      return {
        isAuthenticated: false};
    default:
      return state;
  }
}