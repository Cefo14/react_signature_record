import React from 'react';
import PropTypes from 'prop-types';

import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';

import useStyles from './styles';

const DisplayData = ({ signatureURL, videoURL }) => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Card>
        <img
          alt="signature"
          src={signatureURL}
        />
      </Card>
      <Card>
        <video
          controls
          src={videoURL}
        />
      </Card>
    </Container>
  );
};

DisplayData.propTypes = {
  signatureURL: PropTypes.string,
  videoURL: PropTypes.string,
};

DisplayData.defaultProps = {
  signatureURL: '',
  videoURL: '',
};

export default DisplayData;