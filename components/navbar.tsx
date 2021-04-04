import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Router from 'next/router';
import { AppBar, Toolbar } from '@material-ui/core';

import Button from './atoms/Button';
import { AuthContext } from '../pages/_app';

const MenuAppBar: React.FC = () => {
  const { login, logout, currentUser } = useContext(AuthContext);

  const useStyles = makeStyles({
    navbar: {
      backgroundColor: '#270000',
    },
    span: {
      textTransform: 'none',
    },
  });

  const classes = useStyles();

  const loginOrLogoutButton = () => {
    if (currentUser) {
      return (
        <Button onClick={() => logout()} color="inherit">
          <span className={classes.span}>ログアウト</span>
        </Button>
      );
    }
    return (
      <Button onClick={() => login()} color="inherit">
        <span className={classes.span}>Googleでログイン</span>
      </Button>
    );
  };

  return (
    <div>
      <AppBar position="static" className={classes.navbar}>
        <Toolbar>
          <Button onClick={() => Router.push('/')} color="inherit">
            いとおかし
          </Button>
          {loginOrLogoutButton()}
          {currentUser && <span>{currentUser.displayName}さん</span>}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default MenuAppBar;
