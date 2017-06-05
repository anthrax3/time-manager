import {apiConfig} from '../Config/AppConfig'

class Api {
  static headers() {
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'dataType': 'json',
    }
  }

  static get(route) {
    return this.xhr(route, null, 'GET');
  }

  static put(route, params) {
    return this.xhr(route, params, 'PUT')
  }

  static post(route, params) {
    return this.xhr(route, params, 'POST')
  }

  static delete(route, params) {
    return this.xhr(route, params, 'DELETE')
  }

  static xhr(route, params, verb) {
    const {host, baseUrl} = apiConfig;
    const url = `${host}${baseUrl}${route}`
    let options = Object.assign({ method: verb }, params ? { body: JSON.stringify(params) } : null );
    options.headers = Api.headers()
    return fetch(url, options)
      .then( resp => resp.json())
      .catch(err => {
        console.error(err);
      });
  }

  /**
   * Log related API actions
   * @param  {Array} date eg. [MM, YYYY]
   * @return {Promise} fetch
   */
  logs(userId, date) {
    const {training} = apiConfig;
    return Api.get(`${training}${date.join('/')}/${userId}`)
  }

  /**
   * User related API actions
   * @param  {String} action
   * @return {Promise} fetch
   */
  users(action){
    const {users, training} = apiConfig;
    const actions = {
      FETCH_LIST: Api.get(users)
    };

    return actions[action];
  }
}


export default new Api()
