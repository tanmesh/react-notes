import React from "react";
import { useQuery } from "react-query"; /* Hook we use for all data fetching needs */
import axios from "axios"; /* Library we use to make HTTP requests */
import { Button } from 'react-bootstrap';

const fetchSuperheroes = async () => {
  return await axios.get("http://localhost:3004/superheroes");
};

const RQSuperHeroesPage = () => {
  /*
  * This function is called when the query is successful in fetching data.
  * React Query also automatically injects the data into the onSuccess callabck.
  */
  const onSuccess = (data) => {
    console.log("Data fetched successfully, ", data);
  }

  /*
  * This function is called when the query encounters errors when fetching data.
  * React Query also automatically injects the error into the onError callabck.
  */
  const onError = (error) => {
    console.log("Perform side effects when the data fetching fails, ", error);
  }
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
   * 9. refetch is a function that can be called to refetch the data
   */
  const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
    "superheroes",
    fetchSuperheroes,
    {
      /*
      * cacheTime is the time in milliseconds that the data will be cached in the queryClient instance.
      * We we stay on the same page, after the cacheTime expires, the data will be refetched from the server.
      * If we navigate to other page, the data will be garbage collected after the cacheTime expires.
      * If wenavigate back-and-forth between pages, the data will be refetched from the server.
      * Default value is 5 minutes.
      * If the cacheTime is set to 5000, the data will be refetched after 5 seconds.
      * Status changes from stale to fetching after 5 seconds.
      */
      cacheTime: 5000,
      /*
      * staleTime is the time in milliseconds that the cached data will be considered fresh.
      * It is used when its OK to display stale data while the data is being refetched in the background.
      * If the data is stale, React Query will refetch the data in the background.
      * Default value is 0.
      * If the staleTime is set to 3000, the data will be refetched after 3 seconds.
      * Status changes from fresh to stale after 3 seconds.
      * If the staleTime is set to 0, the data will be refetched every time the component is rendered.
      */
      staleTime: 0,
      /* 
      * If set to true, the data will be refetched when the component is mounted when the cache is stale.
      * If set to false, the data will not be refetched when the component is mounted even if the cache is stale.
      * Default value is true.
      */
      refetchOnMount: true,
      /*
      * When the windown regains focus, the data will be refetched when the cache is stale.
      * If set to true, the data will be refetched when the window regains focus when the cache is stale.
      * If set to false, the data will not be refetched when the window regains focus even if the cache is stale.
      * Default value is true.
      */
      refetchOnWindowFocus: true,
      /*
      * Also known as Polling, is used to refetch the data at a specific interval. 
      * It is paused when the window is out of focus.
      * If set to false, the data will not be refetched at a specific interval.
      * If set to x, the data will be refetched every x milliseconds.
      * Default value is false.
      */
      refetchInterval: false,
      /*
      * This is used to refetch the data in the background while the data is being displayed.
      * If set to true, the data will be refetched in the background while the data is being displayed.
      * If set to false, the data will not be refetched in the background while the data is being displayed.
      * Default value is false.
      */
      refetchIntervalInBackground: false,
      /*
      * This is used to tell React Query to not refetch the data when the component is mounted.
      * If set to true, the data will be refetched when the component is mounted.
      * If set to false, the data will not be refetched when the component is mounted.
      */
      enabled: false,
      onSuccess: onSuccess,
      onError: onError,
      select: (data) => {
        const superHeroeNames = data.data.map((hero) => hero.name);
        return superHeroeNames;
      },
    }
  );

  /*
   * If the data is still loading, we display a loading message.
   * When the loading fails, React Query retries the request by default.
   * 
   * For subsequent requests, React Query will use the cached data instead of making a network request. 
   * React Query triggers background updates to keep the data fresh.
   */
  if (isLoading || isFetching) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <h2>RQ Super Heroes Page</h2>
      <Button variant="primary" size="sm" onClick={() => refetch()}>Refetch</Button>
      {/* {data?.data.map((hero) => {
        return <div key={hero.name}>{hero.name}</div>;
      })} */}
      {data?.map((heroName)=> {
        return <div key={heroName}>{heroName}</div>;
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
