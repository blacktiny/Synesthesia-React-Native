import { ActionTypes } from '../constants/constants'

export function setSubscriptionType(subscriptionType) {
  return {
    type: ActionTypes.SET_SUBSCRIPTION_TYPE,
    payload: { subscriptionType }
  }
}

export function paySubscription(planId, stripeToken) {
  return {
    type: ActionTypes.PAY_SUBSCRIPTION,
    payload: { planId, stripeToken }
  }
}

export function unsubscribe() {
  return {
    type: ActionTypes.UNSUBSCRIBE,
  }
}