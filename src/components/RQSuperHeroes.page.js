import React from "react";
import { useSuperHeroesData, useAddSuperHeroData } from "../hooks/useSuperHeroesData";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { DarkButton, SubmitButton } from "../styled-components/Button";

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
  const { isLoading, data, isError, error, isFetching, refetch } = useSuperHeroesData(onSuccess, onError);

  const { mutate: addSuperHero } = useAddSuperHeroData();

  const handleAddHeroClick = (values) => {
    const heroData = {
      name: values.heroName,
      alterEgo: values.heroAlterEgo,
    }
    addSuperHero(heroData);
  }

  return (
    <>
      <h2>RQ Super Heroes Page</h2>
      <h3>Add New Super Hero</h3>
      <Formik
        initialValues={{ heroName: '', heroAlterEgo: '' }}
        onSubmit={(values, actions) => {
          handleAddHeroClick(values);
          actions.setSubmitting(false);
          actions.resetForm();
        }}
        validationSchema={
          Yup.object().shape({
            heroName: Yup.string().required('Hero Name is required'),
            heroAlterEgo: Yup.string().required('Hero Alter Ego is required'),
          })
        }
      >
        {formik => (
          <Form>
            <div className="flex-column">
              <Field type="text" name="heroName" placeholder="Enter hero Name" />
              <Field type="text" name="heroAlterEgo" placeholder="Enter hero Alter ego" />
              <SubmitButton type="submit" disabled={formik.isSubmitting}>Add</SubmitButton>
            </div>
          </Form>
        )}
      </Formik>
      <h3>Super Heroes List</h3>
      <DarkButton onClick={() => refetch()}>Refetch</DarkButton>
      {/*
          * If the data is still loading, we display a loading message.
          * When the loading fails, React Query retries the request by default.
          *
          * For subsequent requests, React Query will use the cached data instead of making a network request.
          * React Query triggers background updates to keep the data fresh.
          */}
      {isLoading && <div>Loading...</div>}
      {isFetching && <div>Fetching...</div>}
      {isError && <div>Error: {error}</div>}
      {data?.data.map((hero) => {
        return <div key={hero.id}>
          <Link to={`/rq-superhero/${hero.id}`}>{hero.name}</Link>
        </div>;
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
