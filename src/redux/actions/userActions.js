import { userTypes} from './types';
import axios from 'axios';
import { history } from '../../utility/history';
import jwt_decode from 'jwt-decode';

export const login = (token) => {
    return dispatch =>{
        try{
            var decoded = jwt_decode(token);
            localStorage.setItem('token', token);
            dispatch({type: userTypes.USERS_LOGIN_SUCCESS, name: decoded.name});
            history.push('/home');
        }
        catch(error){
            
        }

    }
}
export const logout = () =>{
    return dispatch =>{
        console.log("logout");
        localStorage.removeItem("token")
        dispatch({type: userTypes.USERS_LOGOUT});
        history.push('/login');
    }
}
export const getUsers = () =>{
    return dispatch =>{
        axios.get('api/users').then((res)=>{
            console.log(res.data);
            dispatch({type: userTypes.GET_USERS, users: res.data});
        }).catch((err) =>{
            console.log(err);
        });
    }
}
export const getUserInfo = (username) =>{
    return dispatch =>{
        axios.get('api/users/'+username).then((res)=>{
            dispatch({type: userTypes.GET_INFO, score: res.data.score});
        }).catch((err) =>{
            console.log(err);
        });
    }
}
export const getUserChallenges = (username) =>{
    return dispatch =>{
        axios.get('api/users/'+username+"/challenges").then((res)=>{
            console.log(res.data);
            dispatch({type: userTypes.GET_USER_CHALLENGES, userChallenges: res.data});
        }).catch((err) =>{
            console.log(err);
        });
    }
}


/*
export const find = () => {
    return dispatch =>{
        axios.get('api/users').then((res)=>{
            dispatch({type: userTypes.FIND_USERS, users: res.data});
        }).catch((err) =>{
            console.log(err);
        });
    }
} 

export const create = (User) => {
    return dispatch =>{
        axios.post('api/users', User).then((res)=>{
            console.log("User created!");
        }).catch((err) =>{
            console.log(err);
        });
    }
} 
export const update = (User) => {
    return dispatch =>{
        axios.put('api/users/'+User.name, User).then((res)=>{
            history.push('/ranking');
            console.log("User updated!");
        }).catch((err) =>{
            console.log(err);
        });
    }
} */