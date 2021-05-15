import {challengeTypes} from '.././actions/types';

const initialState = {
    challenges: [],
    codeSuccess: true
};

export default function challenges(state=initialState, action){
    switch (action.type) {
        case challengeTypes.FIND_CHALLENGES:
            return {
                ...state,
                challenges: action.challenges,
            };
        case challengeTypes.ENTER_CODE:
            return {
                ...state,
                codeSuccess: action.codeSuccess,
            };
        default:
            return state;
    }
  }