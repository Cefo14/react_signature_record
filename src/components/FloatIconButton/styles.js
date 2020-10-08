import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  iconButton: {
    position: 'absolute',
    bottom: '8px',
    left: '50%',
  
    border: 'solid 2px #000',
    backgroundColor: 'rgba(255, 255, 255, 0.75)',

    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
    }
  },
}));