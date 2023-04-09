// export const API_BASE_URL = 'http://krews-env.eba-ahbhtrgp.us-east-2.elasticbeanstalk.com/api/';
export const API_BASE_URL = 'https://b60ftfcanc.execute-api.us-east-2.amazonaws.com/api/';
export const IMAGE_BASE_URL = '/';
export function getHeaders() {
  return {
    headers:{
      'Authorization': 'Bearer ' + window.localStorage.getItem('token')
    }
  }  
}