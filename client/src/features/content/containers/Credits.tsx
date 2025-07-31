// import { credits } from '@/assets/mockData/credits';
import { TvShowDetails } from '@/types/TvDetails';
import { filterCastMembers, filterCrewMembers, findDirector } from '../utils/filterCredits';
import ViewMoreCredits from './ViewMoreCredits';

type Prop = {
    credits: Credits;
    contentDetails: MovieDetails | TvShowDetails;
};

function Credits({ credits, contentDetails }: Prop) {
    const director = findDirector(credits.crew);
    const cast = filterCastMembers(credits.cast);
    const crew = filterCrewMembers(credits.crew);
    const LENGTH = 2;

    return (
        <div aria-label="Cast" className="space-y-1 text-xs text-neutral-400">
            {cast.length > 0 && (
                <div className="flex gap-1">
                    <p className="font-bold">Starring: </p>
                    <ul className="flex gap-2 text-ellipsis overflow-hidden">
                        {cast.slice(0, LENGTH).map((castMember, index) => {
                            const knownFor = castMember.known_for_department.toLowerCase();
                            if (knownFor !== 'acting') return;

                            return (
                                <li key={castMember.id} className="flex-none flex gap-1">
                                    <p className="">
                                        {castMember.name}
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
            )}
            {director && (
                <div className="flex gap-1">
                    <p className="font-bold">Director:</p>
                    <p className="">{director}</p>
                </div>
            )}
        </div>
    );
}

export default Credits;
