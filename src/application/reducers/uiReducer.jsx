import * as uiActions from '../actions/ui'

const initialState = {
    loading: true
}

const uiReducer =  (state = initialState, action) => {
    switch (action.type){
        case (uiActions.SET_LOADING_ON):
        case(uiActions.SET_LOADING_OFF):
            return { ...state, loading: action.payload};
        default:
            return state;
    }
}

export default uiReducer;