import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useSuperHeroData } from '../../hooks/useSuperHeroData';
import { StyledButton } from '../../styled-components/Button';

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
      <h2>Super Hero details for <strong>{data?.name}</strong></h2>
      <div>
        <strong>Alter Ego:</strong> {data?.alterEgo}
      </div>
      <StyledButton onClick={() => navigate("/rq-superheroes")}>Navigate back</StyledButton>
    </div>
  )
}

export default RQSuperHeroPage
