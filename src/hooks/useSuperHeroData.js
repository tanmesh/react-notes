import { useQuery } from 'react-query';
import axios from 'axios';

/*
* The function receives various values, out of which we use queryKey.
* queryKey mimic the query array we have passed in useQuery (eg,  ["superhero", heroId])
*/ 
const fetchSuperHero = async ({ queryKey }) => {
    const heroId = queryKey[1]
    return await axios.get(`http://localhost:3004/superheroes?id=${heroId}`);
}

export const useSuperHeroData = (heroId, onSuccess, onError) => {
    return useQuery(
        ["superhero", heroId],
        /* React Query automatically passes the parameters in the fetcher functions.  */
        fetchSuperHero,
        {
            onSuccess: onSuccess,
            onError: onError,
            select: (data) => {
                if (data?.data[0]) {
                    return data?.data[0]
                }
                return {};
            }
        }
    );
}