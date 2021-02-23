import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Rating } from '@material-ui/lab';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    margin: '20px 0',
  },
  input: {
    '&:before': {
      borderColor: '#FFFFFF',
    },
  },
  label: {
    color: '#FFFFFF',
  },
}));

const EvaluationForm: React.FC = () => {
  const { control, watch } = useFormContext();
  const evaluation: number = watch('evaluation', 0);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography component="legend">評価する</Typography>
      <Controller
        control={control}
        name="evaluation"
        render={({ onChange, value }) => (
          <Rating
            name="evaluation"
            value={Number(value)}
            precision={0.1}
            onChange={onChange}
          />
        )}
      >
      </Controller>
      <span>{evaluation}</span>
    </div>
  );
};

export default EvaluationForm;
