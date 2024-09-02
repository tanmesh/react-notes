import React from 'react'
import { useState, useEffect } from 'react' 
import { request } from '../../utils/axios-utils'

export const SuperHeroesPage = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState([])
    // eslint-disable-next-line
    const [error, setError] = useState('')
  
    useEffect(() => {
      request({ url: `/superheroes` })
        .then(response => {
          setData(response.data)
          setIsLoading(false)
        })
    }, [])
  
    return (
      <>
        <h2>Super Heroes Page</h2>
        {isLoading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}
        {data.map(hero => {
          return <div key={hero.name}>{hero.name}</div>
        })}
      </>
    )
  }

export default SuperHeroesPage;
