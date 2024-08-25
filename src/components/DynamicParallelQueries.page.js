import React from 'react'
import { useQueries } from 'react-query'
import axios from 'axios'

const fetchSuperHeroe = (heroId) => {
    return axios.get(`http://localhost:3004/superheroes/${heroId}`)
}
const DynamicParallelQueriesPage = ({ heroIds }) => {
    const queryResults = useQueries(
        heroIds.map(id => {
            return {
                queryKey: ['superhero', id],
                queryFn: () => fetchSuperHeroe(id)
            }
        })
    )
    console.log({ queryResults })
    return (
        <>
            <h2>DynamicParallelQueriesPage</h2>
            {queryResults.map((result, index) => {
                const { data, error, isLoading } = result
                return (
                    <div key={index}>
                        {isLoading && <div>Loading...</div>}
                        {error && <div>Error: {error.message}</div>}
                        {data && <div>{data.data.name}</div>}
                    </div>
                )
            })
            }
        </>
    )
}

export default DynamicParallelQueriesPage
