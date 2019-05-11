import AuthToken from '../env.example';
import axios from 'axios';
const cachedResponse = localStorageKey => {
  let cacheHit = sessionStorage.getItem(localStorageKey) || null;
  if (cacheHit) {
    console.log('from cache', localStorageKey);
    return new Promise((resolve, _) => {
      resolve(JSON.parse(cacheHit));
    });
  } else {
    return new Promise((resolve, reject) => {
      axios
        .get(localStorageKey, {
          headers: {
            Authorization: AuthToken(),
          },
        })
        .then(response => {
          sessionStorage.setItem(localStorageKey, JSON.stringify(response));
          resolve(response);
        })
        .catch(error => {
          // handle error
          let error_message = [
            error.response.data.message,
            'Come back at ',
            new Date(error.response.headers['x-ratelimit-reset'] * 1000),
          ].join(' ');
          reject(error_message);
        });
    });
  }
};

export default cachedResponse;
