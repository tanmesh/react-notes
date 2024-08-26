import React from 'react'
import { useQueries } from 'react-query'
import {request } from '../utils/axios-utils'

const fetchSuperHeroe = (heroId) => {
    return request({ url: `/superheroes?id=${heroId}` });
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
            <h2>Dynamic Parallel Queries Page</h2>
            {queryResults.map((result, index) => {
                const { data, error, isLoading } = result
                return (
                    <div key={index}>
                        {isLoading && <div>Loading...</div>}
                        {error && <div>Error: {error.message}</div>}
                        {data && <div>{data.data[0].name}</div>}
                    </div>
                )
            })
            }
        </>
    )
}

export default DynamicParallelQueriesPage
