// import { credits } from '@/assets/mockData/credits';
import {
    filterCastMembers,
    filterCrewMembers,
    findMovieDirector,
    findSeriesCreator,
} from '../utils/filterCredits';
import ViewMoreCredits from './ViewMoreCredits';

type Prop = {
    credits: Credits;
    contentDetails: MovieDetails | TvShowDetails;
};

function Credits({ credits, contentDetails }: Prop) {
    const director =
        'created_by' in contentDetails
            ? findSeriesCreator(contentDetails.created_by)
            : findMovieDirector(credits.crew);
    const cast = filterCastMembers(credits.cast);
    const crew = filterCrewMembers(credits.crew);
    const LENGTH = 2;

    return (
        <div aria-label="Cast" className="space-y-1 text-neutral-400">
            {cast.length > 0 && (
                <>
                    <div className="flex gap-1">
                        <p className="font-bold lg:text-neutral-500 lg:font-semibold">Starring: </p>
                        <ul className="flex gap-1 text-ellipsis overflow-hidden md:text-white">
                            {cast.slice(0, LENGTH).map((castMember, index) => {
                                const knownFor = castMember.known_for_department.toLowerCase();
                                if (knownFor !== 'acting') return;

                                const lastCastItem = index === LENGTH - 1;

                                return (
                                    <li key={castMember.id} className="flex-none flex gap-1">
                                        <p className="">
                                            {castMember.name + (!lastCastItem ? ',' : '')}
                                            {index === cast.slice(0, LENGTH).length - 1 && '...'}
                                        </p>

                                        {index === cast.slice(0, LENGTH).length - 1 && (
                                            <ViewMoreCredits
                                                contentDetails={contentDetails}
                                                cast={cast}
                                                crew={crew}
                                                director={director}
                                            />
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {contentDetails.genres.length > 0 && (
                        <div className="flex gap-1">
                            <p className="font-bold lg:text-neutral-500 lg:font-semibold">
                                Genres:
                            </p>
                            <ul className="flex gap-1 md:text-white">
                                {contentDetails.genres.map((genre, i) => {
                                    const lastGenre = i === contentDetails.genres.length - 1;

                                    return (
                                        <li key={genre.id} className="">
                                            <p className="">
                                                {genre.name + (!lastGenre ? ',' : '')}
                                            </p>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    )}
                </>
            )}
            {director && (
                <>
                    {typeof director === 'string' ? (
                        <div className="flex gap-1">
                            <p className="font-bold lg:text-neutral-500 lg:font-semibold">
                                Director:
                            </p>
                            <p className="md:text-white">{director}</p>
                        </div>
                    ) : (
                        <div className="flex gap-1">
                            <p className="font-bold lg:text-neutral-500 lg:font-semibold">
                                {director.length > 1 ? 'Directors' : 'Director'}:
                            </p>
                            <ul className="md:text-white flex gap-1">
                                {director.map((name, index) => {
                                    return (
                                        <li key={index} className="">
                                            {name}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    )}
                </>
            )}

            {}
        </div>
    );
}

export default Credits;
