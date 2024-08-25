import React from "react";
import { useQuery } from "react-query"; /* Hook we use for all data fetching needs */
import axios from "axios"; /* Library we use to make HTTP requests */

const fetchSuperheroes = async () => {
  return await axios.get("http://localhost:3004/superheroes");
};

const RQSuperHeroesPage = () => {
  /*
   * useQuery hook takes two arguments:
   * 1. The key which is a unique identifier for the query
   * 2. The function that will be called to fetch the data
   * 3. The useQuery hook returns an object with isLoading, data, isError, error, and isFetching properties
   * 4. isLoading is true when the data is being fetched
   * 5. data is the fetched data
   * 6. isError is true when the data fetching fails
   * 7. error is the error object
   * 8. isFetching is true when the query is fetching data in the background
   */
  const { isLoading, data, isError, error, isFetching } = useQuery(
    "superheroes",
    fetchSuperheroes, 
    {
      /*
      * cacheTime is the time in milliseconds that the data will be cached in the queryClient instance.
      * We we stay on the same page, after the cacheTime expires, the data will be refetched from the server.
      * If we navigate to other page, the data will be garbage collected after the cacheTime expires.
      * If wenavigate back-and-forth between pages, the data will be refetched from the server.
      */
      cacheTime: 5000, 
    }
  );

  /*
   * If the data is still loading, we display a loading message.
   * When the loading fails, React Query retries the request by default.
   * 
   * For subsequent requests, React Query will use the cached data instead of making a network request. 
   * React Query triggers background updates to keep the data fresh.
   */
  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <h2>RQ Super Heroes Page</h2>
      {data?.data.map((hero) => {
        return <div key={hero.name}>{hero.name}</div>;
      })}
    </>
  );
};

export default RQSuperHeroesPage;

/*
 * In the RQSuperHeroesPage component, we use the useQuery hook from React Query to fetch the data from the server.
 * The useQuery hook takes two arguments:
 * 1. The key which is a unique identifier for the query
 * 2. The function that will be called to fetch the data
 *
 * The key is used to cache the data in the queryClient instance.
 * If the key is the same, the data will be fetched from the cache instead of making a network request.
 */
