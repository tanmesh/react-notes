import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useSuperHeroData } from '../hooks/useSuperHeroData';
import { Button } from 'react-bootstrap';

const RQSuperHeroPage = () => {
  const { heroId } = useParams();
  const navigate = useNavigate()

  const onSuccess = (data) => {
    console.log("Data fetched successfully, ", data);
  }

  const onError = (error) => {
    console.log("Perform side effects when the data fetching fails, ", error);
  }

  const { isLoading, data, isError, error } = useSuperHeroData(heroId, onSuccess, onError);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error}</h2>
  }

  return (
    <div>
      Super Hero details for <strong>{data?.name}</strong>
      <div>
        <strong>Alter Ego:</strong> {data?.alterEgo}
      </div>
      <Button variant="primary" size="sm" onClick={() => navigate("/rq-superheroes")}>Navigate back</Button>
    </div>
  )
}

export default RQSuperHeroPage
