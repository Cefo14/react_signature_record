import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  container: {
    '& > div': {
      padding: theme.spacing(4),

      '& img, & video': {
        width: '100%'
      },

      '&:not(:last-child)': {
        marginBottom: theme.spacing(2)
      }
    }
  },
}));