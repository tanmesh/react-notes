import { useQuery, useQueryClient, useMutation } from 'react-query';
import { request } from '../utils/axios-utils'

/*
* The function receives various values, out of which we use queryKey.
* queryKey mimic the query array we have passed in useQuery (eg,  ["superhero", heroId])
*/
const fetchSuperHero = async ({ queryKey }) => {
    const heroId = queryKey[1]
    return request({ url: `/superheroes?id=${heroId}` });
}

export const useSuperHeroData = (heroId, onSuccess, onError) => {
    const queryClient = useQueryClient()
    return useQuery(
        ["superhero", heroId],
        // We are passing an object to fetchSuperHero, which contains queryKey.
        fetchSuperHero,
        {
            onSuccess: onSuccess,
            onError: onError,
            select: (data) => {
                if (data?.data[0]) {
                    return data?.data[0]
                }
                return {};
            },
            // This will fetch the data from the cache if it is available when the component is mounted.
            initialData: () => {
                const hero = queryClient
                    .getQueryData("superheroes")
                    ?.data?.find(hero => hero.id === heroId)
                return hero ? { data: hero } : undefined
            }
        },
    );
}
