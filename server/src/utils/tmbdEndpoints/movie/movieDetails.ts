import { MovieDetail } from '../../../types/movies';
import { fetchConfig, fetchResponse } from '../../helperFuncs';
import { detailsUrl } from '../assets/details';

export async function movieDetails(id: string): Promise<MovieDetail.Response | null> {
    const { options } = fetchConfig('GET', [id]);
    const url = detailsUrl(id).movie;

    const response = await fetchResponse<MovieDetail.Response>('get', url, options);
    return response;
}
