import { handleActions } from 'redux-actions'
import Constants from '../constants/home'

export default handleActions ({
    [Constants.ON_GET_INFO_LIST_SUCCEEDED](state, action) {
        const { data } = action
        return {
            ...state,
            arr: data,
        }
    }
}, {
    arr: [],
})