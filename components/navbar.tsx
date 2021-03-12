import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Router from 'next/router';

import {
  AppBar, Toolbar,
} from '@material-ui/core';

import Button from './atoms/Button';

const MenuAppBar:React.FC = () => {

  const MySwal = withReactContent(Swal);

  const useStyles = makeStyles(theme => ({
    navbar: {
      backgroundColor: '#270000',
    },
    halloweenFont: {
      color: '#FFAA01',
    },
  }));

  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.navbar}>
      <Toolbar>
        <Button onClick={() => Router.push('/')} color="inherit">
          いとおかし
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default MenuAppBar;
