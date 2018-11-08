import { takeEvery, isCancelError } from 'redux-saga'
import { take, call, put, fork, cancel } from 'redux-saga/effects'
import { getJSON } from '@sunl-fe/dataservice'
import Constants from '../constants/home'
import URLS from '../constants/URLS'

function *onGetInfoList(action) {
    try {
        const { payload: { params } } = action
        const { data } = yield call(getJSON, URLS.onGetInfoList, params )
        yield put({ type: Constants.ON_GET_INFO_LIST_SUCCEEDED, data, params })
    }catch (e) {
        yield put({ type: Constants.ON_GET_INFO_LIST_FAILED, e })
    }
}

function *onGetInfoListSaga() {
    yield* takeEvery(Constants.ON_GET_INFO_LIST_REQUESTED, onGetInfoList)
}

export {
    onGetInfoListSaga
}