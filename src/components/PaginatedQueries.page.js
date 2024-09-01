import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { request } from '../utils/axios-utils'
import { ArrowRight, ArrowLeft } from 'react-bootstrap-icons';
import { StyledButton } from '../styled-components/Button'


const fetchColors = async (pageNumber) => {
    return await request({ url: `/colors?_per_page=2&_page=${pageNumber}` });
}

const PaginatedQueriesPage = () => {
    const [pageNumber, setPageNumber] = useState(1)
    const { data, isLoading, isError, error, isFetching } = useQuery(
        ['colors', pageNumber],
        () => fetchColors(pageNumber),
        {
            select: (data) => data?.data?.data,
            // This will maintain the last fetched data while fetching the new data.
            keepPreviousData: true,
        }
    )

    return (
        <>
            <h2>Paginated Queries Page</h2>
            {isLoading && <div>Loading...</div>}
            {isFetching && <div>Fetching...</div>}
            {isError && <div>Error: {error}</div>}
            {data?.map(color =>
                <div key={color.id}>
                    {color.id}. {color.label}
                </div>
            )}
            <div>
                <StyledButton
                    onClick={() => setPageNumber(pageNumber - 1)}
                    disabled={pageNumber === 1}
                >
                    <ArrowLeft />
                    Previous page
                </StyledButton>
                <StyledButton
                    onClick={() => setPageNumber(pageNumber + 1)}
                    disabled={pageNumber === 4}
                >
                    Next page
                    <ArrowRight />
                </StyledButton>
            </div>
        </>
    )
}

export default PaginatedQueriesPage
