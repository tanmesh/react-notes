import React from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'

/*
* Dependent Queries are the queries that are dependent on the other queries.
Eg. Fetching the 'channelId' from the 'users', and then fetching 'courses' based on the 'channelId'.
*/

const fetchUserByEmail = (email) => {
    return axios.get(`http://localhost:3004/users?email=${email}`)
}

const fetchCoursesByChannelId = (channelId) => {
    return axios.get(`http://localhost:3004/channels?id=${channelId}`)
}

const DependedQueriesPage = ({ email }) => {
    const { data: user, isLoading: loadingUsers, isError:usersIsError, error: userError } = useQuery(['user', email], () => fetchUserByEmail(email))

    const channelId = user?.data[0]?.channelId

    const { data: courses, isLoading : loadingCourses, isError: coursesIsError, error: coursesError } = useQuery(
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
