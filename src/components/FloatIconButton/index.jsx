import React, { memo } from 'react';
import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton';

import PlayArrowIcon from '@material-ui/icons/PlayArrowOutlined';
import StopIcon from '@material-ui/icons/Stop';

import useStyles from './styles';

const FloatIconButton = ({ isRecording, onClick }) => {
  const classes = useStyles();

  return (
    <IconButton
      type="button"
      className={classes.iconButton}
      variant="contained"
      color={
        isRecording
          ? 'secondary'
          : 'primary'
      }
      onClick={onClick}
    >
      {
        isRecording
          ? <StopIcon color="secondary" />
          : <PlayArrowIcon color="primary" />
      }
    </IconButton>
  )
};

FloatIconButton.propTypes = {
  isRecording: PropTypes.bool,
  onClick: PropTypes.func,
};

FloatIconButton.defaultProps = {
  isRecording: false,
  onClick: () => {},
};

export default memo(FloatIconButton);