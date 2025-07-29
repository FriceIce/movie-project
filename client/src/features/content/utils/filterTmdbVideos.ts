export function filterTmdbVideos(videoList: TmdbVideoObject[]): FilteredVideos {
    // filter out objects that do not have the type `teaser`, `trailer`, or `clips`.
    const filteredVideoList = videoList.filter((video) =>
        ['teaser', 'trailer', 'clips'].includes(video.type.toLowerCase())
    );

    // Find the trailer vide object.
    const trailer = videoList.find((video) => video.type.toLowerCase() === 'trailer') || null;

    return {
        trailer: trailer,
        all: filteredVideoList,
    };
}
