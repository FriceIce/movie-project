import { fetchConfig, fetchResponse } from '../../../utils/helperFuncs';
import { videosUrl } from './utils/url/videos';

export function videos(type: MovieOrTv, id: string) {
    const { options } = fetchConfig('GET');
    const url = videosUrl(id, type);
    const response = fetchResponse('get', url, options);

    if (!response) {
        throw new Error('The fetch request was sent but did not succeed.');
    }

    return response;
}
