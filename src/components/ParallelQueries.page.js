import React from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'

const fetchSuperHeroes = () => {
    return axios.get('http://localhost:3004/superheroes')
}

const fetchFriends = () => {
    return axios.get('http://localhost:3004/friends')
}

/*
* Parallel Queries are the queries that are executed in the parallel to 
* maximize the concurrency.

* This might seems trivial, but using React Query, we can fetch multiple 
* queries in parallel by using multiple useQuery hooks.
*/
const ParallelQueriesPage = () => {
    /* We use alias to differentiate between values */
    const { data: superHeroesData } = useQuery('superheroes', fetchSuperHeroes)
    const { data: friendsData } = useQuery('friends', fetchFriends)

    return (
        <>
        <div>Parallel Queries Page</div>
        <div>
            <h4>Super Heroes</h4>
            {superHeroesData?.data?.map(hero => (
                <div key={hero.id}>{hero.name}</div>
            ))}
            <h4>Friends</h4>
            {friendsData?.data?.map(friend => (
                <div key={friend.id}>{friend.name}</div>
            ))}
        </div>
        </>
    )
}

export default ParallelQueriesPage
