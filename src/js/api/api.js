const what3wordsUrl = "https://api.what3words.com/v2/forward";
const what3wordsAPIKey = "TBF0OQEZ";

let commonHeaders = {
  'Content-Type': 'application/json',
}

export const getLocationByWhat3Words = (address) => fetch(`${what3wordsUrl}?addr=${address}&key=${what3wordsAPIKey}`, {
  method: 'GET',
  headers: {
    // ...commonHeaders,
  }
}).then((response) => response.json().then((data) => {
  console.log('data = ', data)
  return data;
}));