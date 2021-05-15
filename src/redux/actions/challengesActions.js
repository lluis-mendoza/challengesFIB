import { challengeTypes} from './types';
import axios from 'axios';
import { history } from '../../utility/history';
import jwt_decode from 'jwt-decode';


export const getChallenges = () => {
    return dispatch =>{
        axios.get('api/challenges').then((res)=>{
            dispatch({type: challengeTypes.FIND_CHALLENGES, challenges: res.data});
        }).catch((err) =>{
            console.log(err);
        });
    }
}

export const foundChallenge = (code, name) => {
    return dispatch =>{
        if (code != ""){
            axios.post('api/foundChallenge/'+code, {name: name}).then((res)=>{
                if (res.status === 200){
                    dispatch({type: challengeTypes.ENTER_CODE, codeSuccess: res.data.success});
                }
            }).catch((err) =>{
                console.log(err);
            });
        }

    }
}