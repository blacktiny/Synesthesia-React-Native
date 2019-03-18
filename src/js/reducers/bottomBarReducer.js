import { ActionTypes } from '../constants/constants'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const initialState = {
  curBottomBarItem: '',
  curActiveScreen: '',
  showBottomBar: true
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_BOTTOM_BAR_ITEM:
      return {
        ...state,
      }
    case ActionTypes.SET_BOTTOM_BAR_ITEM:
      return {
        ...state,
        curBottomBarItem: action.payload.bottomBarItem,
        curActiveScreen: action.payload.curActiveScreen
      }
    case ActionTypes.TOGGLE_BOTTOM_BAR:
      return {
        ...state,
        showBottomBar: action.payload.showBottomBar
      }
    default:
      return state
  }
}
const PersistConfig = {
  key: 'bottomBarReducer',
  storage: storage,
  blacklist: ['showBottomBar']
}

export const bottomBarReducer = persistReducer(PersistConfig, reducer)