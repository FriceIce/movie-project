import { discoveries } from "../../routes/movies/utils/discovery";
import { tmbdApiKey } from "../../tmdConnection";

export async function discovery(type: 'movie' | 'tv', params?: string[]){
  const parameters = params ? params.splice(0,0,'&').join('&') : ''
  parameters
  const url = type === 'movie' ? discoveries.moviesUrl + parameters : discoveries.tvUrl + parameters
  
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + tmbdApiKey
    }
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data)
    return data; 
  } catch (e) {
    console.warn('Failed to fetch:', e);
  }
}