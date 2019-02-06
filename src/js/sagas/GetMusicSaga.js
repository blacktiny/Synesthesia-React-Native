import { AsyncStorage } from 'react-native';

import { put, call } from 'redux-saga/effects'
import { ActionTypes } from '../constants/constants'
import { getMusic, doLogin } from '../api/api'

getMusicUrl = (node) => {
  let url
  node.itemsets.map(itemset => {
    itemset.item_itemsets.map(item => {
      if (item.item.file && (item.item.file !== '')) {
        url = item.item.file
      }
    })
  })
  return url
}

const getMusicSaga = function* (action) {
  const payload = yield call(getMusic, action.payload, 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMDc0MyIsImlzcyI6Imh0dHBzOlwvXC9zeW5lc3RoZXNpYS5jb21cL2RhdGFcL3B1YmxpY1wvaW5kZXgucGhwXC9hdXRoIiwiaWF0IjoiMTU0ODY5OTQ5NSIsImV4cCI6IjE3Mjg2OTk0OTUiLCJuYmYiOiIxNTQ4Njk5NDk1IiwianRpIjoiYmQ2NzA5Y2MyMjUzMzFhN2RlYTM5N2MyNWVhMDE3ZjUifQ.72U_zWtXXi4DMhkgB58P7WNCEI2hGuCIj_e7SxHlYkc');
  const url = getMusicUrl(payload.node)
  if (payload) {
    yield put({
      type: ActionTypes.GET_MUSIC_SUCCESS,
      payload: url
    })
  }

}

export default getMusicSaga
