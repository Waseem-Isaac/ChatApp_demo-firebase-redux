import { ADD_MESSAGE,  ALL_MSGS, MY_MSGS } from "./actions";
import { tassign } from 'tassign'
export interface AppState {
    // messages : Array<any>;
    numOfAllMsgs: number;
    numOfMyMsgs : number
}

export const INIT_STATE : AppState = {
    // messages : [],
    numOfAllMsgs: 0,
    numOfMyMsgs: 0
}

export function rootReducer(state: AppState , action): AppState {
    switch(action.type){
        case ALL_MSGS : 
            return tassign(state , 
                {
                    numOfAllMsgs : action.numOfAllMsgs
                });
        case MY_MSGS : 
                return tassign(state , {
                    numOfMyMsgs : action.numOfMyMsgs
                });
    }

    return state
}