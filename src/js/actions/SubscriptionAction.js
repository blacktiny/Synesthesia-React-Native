import { ActionTypes } from '../constants/constants'

export function setSubscriptionType(subscriptionType) {
  return {
    type: ActionTypes.SET_SUBSCRIPTION_TYPE,
    payload: { subscriptionType }
  }
}

export function paySubsctiption(planId, stripeToken) {
  return {
    type: ActionTypes.PAY_SUBSCTIPTION,
    payload: { planId, stripeToken }
  }
}