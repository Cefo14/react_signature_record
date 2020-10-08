import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  container: {
    width: '100%',
    height: '100vh',
    position: 'relative',
  },

  canvasVideo: {
    display: 'block',
  },

  canvasSignature: {
    position: 'absolute',
    top: '0',
    left: '0',
  },

  video: {
    display: 'none',
  },
}));