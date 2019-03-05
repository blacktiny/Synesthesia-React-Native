import { ActionTypes } from '../constants/constants'

export function registerUser({
  email,
  password,
  first_name,
  last_name,
  name,
  user_type_id
}) {
  return {
    type: ActionTypes.REGISTER_USER,
    payload: {
      email,
      password,
      first_name,
      last_name,
      name,
      user_type_id
    }
  }
}

