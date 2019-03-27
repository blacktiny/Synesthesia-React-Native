const baseUrl = "https://synesthesia.com/data/public/index.php/";

let commonHeaders = {
  'Content-Type': 'application/json',
}

export const doLogin = (payload) => fetch(`${baseUrl}auth`, {
  method: 'POST',
  headers: {
    ...commonHeaders,
  },
  body: JSON.stringify(payload)
}).then(response => response.json());

export const getUser = (token) => fetch(`${baseUrl}user?token=${token}`, {
  method: 'GET',
  headers: {
    ...commonHeaders,
  },
  // body: JSON.stringify(payload)
}).then(response => response.json());

export const deleteUser = (token) => fetch(`${baseUrl}user?token=${token}`, {
  method: 'DELETE',
  headers: {
    ...commonHeaders,
  },
}).then(response => response.json());

export const doRegister = (payload) => fetch(`${baseUrl}user`, {
  method: 'POST',
  headers: {
    ...commonHeaders,
  },
  body: JSON.stringify(payload)
}).then(response => response.json());

export const updateUser = (payload, token) => fetch(`${baseUrl}user?token=${token}&user=${payload}`, {
  method: 'PUT',
  headers: {
    ...commonHeaders,
  },
}).then(response => response.json());

export const forgotPassword = (email) => fetch(`${baseUrl}resetmail/${email}`, {
  method: 'GET',
  headers: {
    ...commonHeaders,
  }
}).then(response => response.json());

export const getSynesthesia = (token) => fetch(`${baseUrl}node/338?token=${token}`, {
  method: 'GET',
  headers: {
    ...commonHeaders,
  },
}).then(response => response.json())
  .catch(error => error)

export const getSynesthesiaAnonymous = () => fetch(`${baseUrl}node/338`, {
  method: 'GET',
  headers: {
    ...commonHeaders,
  },
}).then(response => response.json());


export const getMindFulness = (token) => fetch(`${baseUrl}node/337?token=${token}`, {
  method: 'GET',
  headers: {
    ...commonHeaders,
  },
}).then(response => response.json());

export const getMindFulnessAnonymous = () => fetch(`${baseUrl}node/337`, {
  method: 'GET',
  headers: {
    ...commonHeaders,
  },
}).then(response => response.json());

export const getBeingAware = (token) => fetch(`${baseUrl}node/1082?token=${token}`, {
  method: 'GET',
  headers: {
    ...commonHeaders,
  },
}).then(response => response.json());

export const getBeingAwareAnonymous = () => fetch(`${baseUrl}node/1082`, {
  method: 'GET',
  headers: {
    ...commonHeaders,
  },
}).then(response => response.json());

export const getNodeByID = (id, token) => fetch(`${baseUrl}node/${id}?token=${token}`, {
  method: 'GET',
  headers: {
    ...commonHeaders,
  },
}).then(response => response.json());

export const getNodeByIDAnonymous = (id) => fetch(`${baseUrl}node/${id}`, {
  method: 'GET',
  headers: {
    ...commonHeaders,
  },
}).then(response => response.json());

export const doCompletion = (nodeId, userId, token) => fetch(`${baseUrl}response?completion={"state":"","node_id":${nodeId},"user_id":"${userId}","responses":[]}&token=${token}`, {
  method: 'POST',
  headers: {
    ...commonHeaders,
  },
}).then(response => response.json());

export const getProgress = (token) => fetch(`${baseUrl}progress?token=${token}`, {
  method: 'GET',
  headers: {
    ...commonHeaders,
  },
}).then(response => response.json());

export const subscriptionPayment = (token, payload) => fetch(`http://demo-synesthesia.zimalab.com/stripe/charge?token=${token}`, {
  method: 'POST',
  headers: {
    ...commonHeaders,
  },
  body: JSON.stringify(payload)
}).then(response => response.json());

export const unSubscribe = (token) => fetch(`http://demo-synesthesia.zimalab.com/stripe/cancel?token=${token}`, {
  method: 'GET',
  headers: {
    ...commonHeaders,
  },
}).then(response => response.json());