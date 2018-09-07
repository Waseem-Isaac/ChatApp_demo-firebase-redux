import { ADD_MESSAGE } from "./actions";
import { tassign } from 'tassign'
export interface AppState {
    // messages : Array<any>;
    numOfMsgs: number;
}

export const INIT_STATE : AppState = {
    // messages : [],
    numOfMsgs: 1
}

export function rootReducer(state: AppState , action): AppState {
    switch(action.type){
        case ADD_MESSAGE : 
            return tassign(state , 
                {
                    numOfMsgs : action.numOfMsgs
                })
    }

    return state
}