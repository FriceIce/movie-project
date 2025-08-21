import React from 'react';

type Props = {
    searchTerm: string | null;
};

function SearchNotFound({ searchTerm }: Props) {
    return (
        <div className="w-max text-sm mx-auto md:py-20 space-y-4">
            <h1 className="">
                Your search for "<span className="text-custom-cyanBlue">{searchTerm}</span>" did not
                match anything.
            </h1>
            <ul className="list-disc list-inside">
                <li className="">Try using a film, series title, or an actors name.</li>
                <li className="">Try genre such as comedy, romance, sports or drama.</li>
            </ul>
        </div>
    );
}

export default SearchNotFound;
