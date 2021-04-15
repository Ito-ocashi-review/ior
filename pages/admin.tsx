import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Axios from 'axios';

type Inputs = {
  name: string;
};

const Admin: React.FC = () => {
  const { handleSubmit, control } = useForm<Inputs>();

  const onSubmit = async (data): Promise<void> => {
    await Axios({
      method: 'post',
      url: '/api/sweets',
      data,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>お菓子を入力してください</h3>
      <Controller
        as={Input}
        name="name"
        control={control}
        placeholder="ビックリマンチョコ"
        className="materialUIInput"
      />
      <Button type="submit" variant="contained" color="primary">
        投稿する
      </Button>
    </form>
  );
};

export default Admin;
