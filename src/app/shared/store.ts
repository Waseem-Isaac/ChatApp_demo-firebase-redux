import { ADD_MESSAGE,  ALL_MSGS, MY_MSGS, OTHER_MSGS } from "./actions";
import { tassign } from 'tassign'
export interface AppState {
    // messages : Array<any>;
    numOfAllMsgs: number;
    numOfMyMsgs : number;
    numOfOtherMsgs : number,
    newOtherMsgs : Array<any>
}

export const INIT_STATE : AppState = {
    // messages : [],
    numOfAllMsgs: 0,
    numOfMyMsgs: 0,
    numOfOtherMsgs: 0,
    newOtherMsgs : []
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
        case OTHER_MSGS : 
                console.log(action.otherMsgs)
                return tassign(state , {
                    numOfOtherMsgs : action.numOfOtherMsgs,
                    newOtherMsgs : action.otherMsgs
                });
    }

    return state
}