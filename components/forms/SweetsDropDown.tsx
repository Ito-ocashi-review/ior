import React from 'react';
import { Select, InputLabel, MenuItem, FormControl } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useFormContext, Controller } from 'react-hook-form';

type Props = {
  sweets: { _id: string; name: string; createdAt: Date }[];
};

const SweetsDropDown: React.FC<Props> = React.memo(({ sweets }) => {
  const { control } = useFormContext();

  const useStyles = makeStyles({
    root: {
      margin: '20px 0',
    },
    label: {
      color: '#FFFFFF',
      '&:after': {
        color: '#FFFFFF',
      },
    },
    select: {
      color: '#FFFFFF',
      '&:before': {
        borderColor: '#FFFFFF',
      },
    },
  });

  const classes = useStyles();

  return (
    <>
      <Controller
        control={control}
        name="sweetId"
        render={({ onChange }) => (
          <FormControl fullWidth className={classes.root}>
            <InputLabel htmlFor="grouped-select" className={classes.label}>
              お菓子を選択
            </InputLabel>
            <Select
              defaultValue="ffsafa"
              id="grouped-select"
              className={classes.select}
            >
              {sweets.map((sweet) => {
                return (
                  <MenuItem
                    key={sweet._id}
                    value={sweet._id}
                    onClick={() => onChange(sweet._id)}
                  >
                    {sweet.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        )}
      ></Controller>
    </>
  );
});

export default SweetsDropDown;
