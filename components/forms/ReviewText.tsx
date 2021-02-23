import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

type FormValues = {
  TextField: string
  comment: string
}

const useStyles = makeStyles(theme => ({
  root: {
    margin: '20px 0',
    color: '#FFFFFF',
  },
  input: {
    color: '#FFFFFF',
    '&:before': {
      borderColor: '#FFFFFF',
    },
  },
  label: {
    color: '#FFFFFF',
  },
}));

const ReviewText: React.FC = () => {
  const { control } = useFormContext<FormValues>();
  const classes = useStyles();

  return (
    <>
      <Controller
        control={control}
        name="comment"
        render={({ onChange, value }) => (
          <TextField
            value={value}
            id="standard-textarea"
            label="コメントを投稿"
            placeholder="投稿内容を入力"
            fullWidth
            rows="5"
            multiline
            margin="normal"
            onChange={onChange}
            className={classes.root}
            InputProps={{
              className: classes.input,
            }}
            InputLabelProps={{
              className: classes.label,
            }}
          />
        )}
      />
    </>
  );
};

export default ReviewText;
