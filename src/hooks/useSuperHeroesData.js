import { useQuery } from "react-query"; /* Hook we use for all data fetching needs */
import { request } from '../utils/axios-utils' /* Axios instance we created */
import { useQueryClient, useMutation } from "react-query";

const fetchSuperheroes = async () => {
  return request({ url: "/superheroes" });
};

export const useSuperHeroesData = (onSuccess, onError) => {
  return useQuery(
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
      enabled: true,
      onSuccess: onSuccess,
      onError: onError,
      // select: (data) => {
      //   const superHeroeNames = data.data.map((hero) => hero.name);
      //   return superHeroeNames;
      // },
    }
  );
}

const addSuperHero = async (hero) => {
  return request({url: "/superheroes", method: "POST", data: hero});
}

export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient()
  return useMutation(addSuperHero, {
    // onSuccess: (data) => {
    //   /*
    //   * Instead of refetching the data from the server. 
    //   * Since we are receiving the data from the server, we can update the cache with the new data.
    //   */
    //   queryClient.setQueryData("superheroes", (oldData) => {
    //     return {
    //       ...oldData,
    //       data: [...oldData.data, data.data],
    //     };
    //   });
    //   // console.log("Data added successfully, ", data);
    //   // queryClient.invalidateQueries("superheroes");
    // },
    onMutate: async (newHero) => {
      await queryClient.cancelQueries("superheroes"); // Cancel the ongoing query to prevent it from updating the cache with the stale data
      const previousData = queryClient.getQueryData("superheroes");
      queryClient.setQueryData("superheroes", (oldData) => {
        return {
          ...oldData,
          data: [...oldData.data, { id: oldData?.data?.length + 1, ...newHero }],
        };
      });
      return { previousData };
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData("superheroes", context.previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries("superheroes");
    },
  })
}
