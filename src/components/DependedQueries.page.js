import React from 'react'
import { useQuery } from 'react-query'
import { request } from '../utils/axios-utils'

/*
* Dependent Queries are the queries that are dependent on the other queries.
Eg. Fetching the 'channelId' from the 'users', and then fetching 'courses' based on the 'channelId'.
*/

const fetchUserByEmail = (email) => {
    return request({ url: `/users?email=${email}` });
}

const fetchCoursesByChannelId = (channelId) => {
    return request({ url: `/channels?id=${channelId}` });
}

const DependedQueriesPage = ({ email }) => {
    const { data: user, isLoading: loadingUsers, isError: usersIsError, error: userError } = useQuery(['user', email], () => fetchUserByEmail(email))

    const channelId = user?.data[0]?.channelId

    const { data: courses, isLoading: loadingCourses, isError: coursesIsError, error: coursesError } = useQuery(
        ['courses', channelId],
        () => fetchCoursesByChannelId(channelId), {
        enabled: !!channelId
    })

    return (
        <>
            <h2>Depended Queries Page</h2>
            {loadingUsers && <div>Loading...</div>}
            {usersIsError && <div>Error: {userError}</div>}
            {courses?.data[0]?.courses.map(course => <div key={course.id}>
                {loadingCourses && <div>Loading...</div>}
                {coursesIsError && <div>Error: {coursesError}</div>}
                {course}
            </div>)}
        </>
    )
}

export default DependedQueriesPage
