interface CreditPerson {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string | null;
    credit_id: string;
}

interface CrewMember extends CreditPerson {
    department: string;
    job: string;
}

interface CastMember extends CreditPerson {
    cast_id: number;
    character: string;
    order: number;
}

interface Credits {
    id: number;
    cast: CastMember[];
    crew: CrewMember[];
}
