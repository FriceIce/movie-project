/**
 * Retrieves the logo path of a specific production company (Marvel or Pixar)
 * from a list of production companies.
 *
 * @param {ProductionCompany[]} companies - An array of production company objects.
 * @returns {string} The logo path (`logo_path`) if Marvel or Pixar is found; otherwise, an empty string.
 */

import { baseImageUrl } from '@/assets/baseTmdbImageUrl';

export function retrieveCompanyLogo(companies: ProductionCompany[]): string {
    const marvel = ['marvel entertainment', 'marvel studios'];
    const pixar = 'pixar';

    const companyObj = companies.filter((company) => {
        const companyNameInLowerCase = company.name.toLowerCase();
        return marvel.includes(companyNameInLowerCase) || companyNameInLowerCase === pixar;
    })[0];

    return companyObj && companyObj.logo_path
        ? baseImageUrl + 'original' + companyObj.logo_path
        : '';
}
