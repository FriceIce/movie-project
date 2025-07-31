export function filterCrewMembers(list: CrewMember[]) {
    const jobs = 'writer';
    return list.filter((crewMember) => jobs === crewMember.job);
}

export function filterCastMembers(list: CastMember[]) {
    const knownFor = 'acting';
    return list.filter((castMember) => knownFor === castMember.known_for_department.toLowerCase());
}

export function findDirector(list: CrewMember[]) {
    return list.find((crewMember) => crewMember.job === 'Director')?.original_name;
}
