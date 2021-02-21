import React from 'react';
import {
  Select, InputLabel, MenuItem, FormControl, FormControlLabel,
} from '@material-ui/core';
import { useFormContext, Controller } from 'react-hook-form';

type Props = {
  sweets: {_id:string, name:string, createdAt:Date}[]
}

const SweetsDropDown: React.FC<Props> = React.memo(({ sweets }) => {
  const { control, watch } = useFormContext();
  const sweet = watch('sweet', '');

  return (
    <>
      <Controller
        control={control}
        name="sweet"
        render={({ onChange }) => (
          <FormControl fullWidth>
            <InputLabel htmlFor="grouped-select">お菓子を選択</InputLabel>
            <Select defaultValue="" id="grouped-select">
              { sweets.map((sweet) => {
                return (
                  <MenuItem
                    key={sweet._id}
                    value={sweet._id}
                    onClick={() => onChange(sweet._id)}
                  >
                    {sweet.name}
                  </MenuItem>
                  );
                })
              }
            </Select>
          </FormControl>
        )}
      >
      </Controller>


    </>
  );
});

export default SweetsDropDown;
