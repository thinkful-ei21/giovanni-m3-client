
import {TOGGLE_HIDDEN} from '../actions/block'


const initialState = {
    isHidden: false,

}

export default function reducer(state = initialState, action){
    if(action.type === TOGGLE_HIDDEN){
        return {...state, isHidden: !state.isHidden}
    }





    return state
}