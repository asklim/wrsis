import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import blue from '@material-ui/core/colors/blue';


const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

const SimpleDialog = (props) =>
{
  //console.log(props);

  const classes = useStyles();
  const { open, onClose, selectedValue, emails, ...other } = props;

  function handleClose() {
    onClose(selectedValue);
  }

  function handleListItemClick(value) {
    onClose(value);
  }

  return (
    <Dialog 
      open={open}
      onClose={handleClose} 
      {...other}
      aria-labelledby="simple-dialog-title"       
    >
      <DialogTitle id="simple-dialog-title">Set account email</DialogTitle>
      <div>
        <List>
          {emails.map(email => (
            <ListItem button onClick={() => handleListItemClick(email)} key={email}>
              <ListItemAvatar>
                <Avatar className={classes.avatar}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={email} />
            </ListItem>
          ))}
          <ListItem button onClick={() => handleListItemClick('addAccount')}>
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="add account" />
          </ListItem>
        </List>
      </div>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  selectedValue: PropTypes.string,
  emails: PropTypes.array,
};

export default SimpleDialog;