import { handleActions } from 'redux-actions'
import Constants from '../constants/login'

export default handleActions({
    [Constants.ON_LOGIN_IN_SUCCEEDED](state, action) {
        return { ...state,  hasLogin: true }
    },
    [Constants.ON_LOGIN_IN_FAILED](state, action) {
        return state
    },
}, {
    hasLogin: false
})