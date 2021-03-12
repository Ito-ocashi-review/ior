import React, { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import logger from 'react-logger';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
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
      sweetId: '',
      comment: '',
      evaluation: 2.5,
    },
  });
  const [sweets, setSweets] = useState([]);

  const onSubmit = async(data) => {
    const axiosInstance = Axios.create({
      headers: { 'Content-Type': 'application/json' },
    });

    try {
      await axiosInstance.post('/api/reviews', { data });
      Router.push('/');
    }
    catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    const getSweets = async() => {
      const res = await Axios.get('/api/sweets');
      setSweets(res.data.sweets);
    };
    getSweets();
  }, []);

  const useStyles = makeStyles(theme => ({
    reviewForm: {
      marginTop: '150px',
      backgroundColor: '#270000',
      padding: '30px 30px 50px 30px',
      borderRadius: '20px',
      color: 'white',
    },
  }));

  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.reviewForm}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <h2>
            新しいレビューを投稿する
          </h2>
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

  // return {
  //   notFound: true,
  // };

  return { props: {} };
};

export default NewReview;
