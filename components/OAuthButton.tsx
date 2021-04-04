import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';

import {
  Button, Grid,
} from '@material-ui/core';

import { signIn } from 'next-auth/client';

const useStyles = makeStyles({
  twitter: {
    color: '#00aced',
  },
  button: {
    textTransform: 'none',
  },
});

const OAuthButton:React.FC = () => {
  const classes = useStyles();

  const handleGithubLogin = () => {
    signIn('github');
  };

  const handleTwitterLogin = () => {
    signIn('twitter');
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <Button
          variant="outlined"
          color="default"
          startIcon={
            <GitHubIcon />
          }
          fullWidth
          onClick={handleGithubLogin}
          className={classes.button}
        >
          GitHub
        </Button>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Button
          variant="outlined"
          color="default"
          startIcon={(
            <TwitterIcon className={classes.twitter} />
          )}
          fullWidth
          onClick={handleTwitterLogin}
          className={classes.button}
        >
          Twitter
        </Button>
      </Grid>
    </Grid>
  );
};

export default OAuthButton;
