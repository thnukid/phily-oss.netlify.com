import AuthToken from '../env.example';
import axios from 'axios';
const cachedResponse = (localStorageKey) => {
  let cacheHit = sessionStorage.getItem(localStorageKey) || null;
  if (cacheHit) {
    console.log('from cache', localStorageKey);
    return new Promise((resolve, _) => {
      resolve(JSON.parse(cacheHit));
    });
  } else {
    return new Promise((resolve, _) => {
      axios
        .get(localStorageKey, {
          headers: {
            Authorization: AuthToken(),
          },
        })
        .then(response => {
          sessionStorage.setItem(localStorageKey, JSON.stringify(response));
          resolve(response);
        });
    });
  }
};

export default cachedResponse
