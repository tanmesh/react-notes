import { useQuery } from 'react-query';
import axios from 'axios';

const fetchSuperHero = async (id) => {
    return await axios.get(`http://localhost:3004/superheroes?id=${id}`);
}

export const useSuperHeroData = (heroId, onSuccess, onError) => {
    return useQuery(
        ["superhero", heroId],
        () => fetchSuperHero(heroId),
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