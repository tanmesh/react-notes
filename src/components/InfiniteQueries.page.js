import React, { Fragment } from 'react'
import { useInfiniteQuery } from 'react-query'
import axios from 'axios'
import { Button, Spinner } from 'react-bootstrap';

const fetchColors = async ({ pageParam = 1 }) => {
    const response = await axios.get(`http://localhost:3004/colors?_per_page=2&_page=${pageParam}`);
    return response.data
}

const InfiniteQueriesPage = () => {
    const { data, isLoading, isError, error, isFetching, hasNextPage, fetchNextPage, isFetchingNextPage, } = useInfiniteQuery(
        ['colors'],
        fetchColors,
        {
            select: (data) => {
                return data?.pages.map((group, index) => {
                    if (Array.isArray(group.data)) {
                        return (
                            <Fragment key={index}>
                                {group.data.map(color => (
                                    <div key={color.id}>
                                        {color.id}. {color.label}
                                    </div>
                                ))}
                            </Fragment>
                        );
                    }
                    return null;
                });
            },
            keepPreviousData: true,
            getNextPageParam: (_lastPage, pages) => {
                if (pages.length < 4) {
                    return pages.length + 1
                }
                return undefined
            }
        }
    )

    return (
        <>
            <h2>Infinite Queries Page</h2>
            {isLoading && <div>Loading...</div>}
            {isFetching && <div>Fetching...</div>}
            {isError && <div>Error: {error}</div>}
            {data}
            <Button
                variant='primary'
                size="sm"
                width="100%"
                disabled={!hasNextPage}
                onClick={fetchNextPage}
            >
                {isFetchingNextPage ? <Spinner animation="border" size="sm" /> : 'Load more'}
            </Button>
        </>
    )
}

export default InfiniteQueriesPage
