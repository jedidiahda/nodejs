const fetch = require('node-fetch');
let TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1NDk1NDMzNTMsImNsaWVudElkIjoiY2pyc2xxNzdkYXptajAxMTJ2c3dlcW5xZSJ9.XlZVctOcwTJcYqkYTv3vYOEOeD7iAVmLGNRomebcohs";

function utils() {
  return {
    gql: ({ query, variables }) => {
      return fetch('https://api.graph.cool/simple/v1/cjtwsytbd66tn0137mk73w2rb', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'authorization': `Bearer ${TOKEN}`
        },
        body: JSON.stringify({ query, variables })
      })
        .then(res => res.json())
        .then(json => {
          if (json.errors) {
            const error = json.errors.shift();

            throw error.functionError || error.message || error;
          }
          return json.data
        })
        .then(data => {
          const keys = Object.keys(data);
          return keys.length && data[keys.shift()];
        })
        .catch(error => {
          console.warn(error);
          return { error };
        });
    },
  }

}

module.exports = utils;