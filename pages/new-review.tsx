import React, { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { getSession } from 'next-auth/client';
import Button from '@material-ui/core/Button';
import logger from 'react-logger';
import { Container } from '@material-ui/core';
import Router from 'next/router';
import { GetServerSideProps } from 'next';
import Axios from 'axios';
import SweetsDropDown from '../components/forms/SweetsDropDown';
import ReviewText from '../components/forms/ReviewText';
import EvaluationForm from '../components/forms/EvaluetionForm';

type Props = {
  sweets: {id:number, name:string, createdAt:Date}[]
}

const NewReview: React.FC<Props> = () => {
  const methods = useForm({
    defaultValues: {
      sweet: '',
      comment: '',
      evaluation: 0,
    },
  });
  const [sweets, setSweets] = useState([]);

  const onSubmit = async(data) => {
    console.log(data);
    // try {
    //   await Axios.post('/api/reviews', { data });
    //   Router.push('/');
    // }
    // catch (error) {
    //   logger.error(error);
    // }
  };

  useEffect(() => {
    const getSweets = async() => {
      const res = await Axios.get('/api/sweets');
      setSweets(res.data.sweets);
    };
    getSweets();
  }, []);

  return (
    <Container maxWidth="md">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <span>
            新しいレビューを登録する
          </span>
          <SweetsDropDown sweets={sweets} />
          <ReviewText />
          <EvaluationForm />
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            fullWidth
          >
            投稿する
          </Button>
        </form>
      </FormProvider>
    </Container>
  );
};

export const getServerSideProps:GetServerSideProps = async(context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      notFound: true,
    };
  }

  return { props: {} };
};

export default NewReview;
