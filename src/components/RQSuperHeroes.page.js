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
   */
  const { isLoading, data, isError, error } = useQuery(
    "superheroes",
    fetchSuperheroes
  );

  /*
   * If the data is still loading, we display a loading message.
   * When the loading fails, React Query retries the request by default.
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
