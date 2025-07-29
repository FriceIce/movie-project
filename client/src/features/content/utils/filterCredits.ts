export function filterCrewMembers(list: CrewMember[]) {
    const jobs = ['director', 'writer'];
    return list.filter((crewMember) => jobs.includes(crewMember.job.toLowerCase()));
}

export function filterCastMembers(list: CastMember[]) {
    const knownFor = 'acting';
    return list.filter((castMember) => knownFor === castMember.known_for_department.toLowerCase());
}

export function findDirector(list: CrewMember[]) {
    return list.find((crewMember) => crewMember.job === 'Director')?.original_name;
}
