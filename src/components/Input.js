import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import {baseEndPoint, currentAPI} from './const'

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 800,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  textField: {
    width: 600,
  },
}));

export default function SimpleModal(props) {
  const classes = useStyles();
  let startValue = ""
// default is false but if there is an item in props, we know it's to be edited and not added.
  let editMode = false
  if (props.hasOwnProperty("todo")===true){
    editMode = true
    startValue=props.todo.text
  }
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState(startValue)



  //in jsx on the return, use a terniary operator instead of an if statement....so edit mode?_____,_______.
  // const handleDelete = () => {
  // setOpen(true)
  // }
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSave = () => {
    let method = "POST"
    let id=""
  if (editMode===true){
    method = "PUT"
    id=`/${props.todo._id}`
  }
fetch(`${baseEndPoint}${currentAPI}/items${id}`,{
  method: method, 
   headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify({text: text})

      })
      .then(httpResult => {

        if (!httpResult.ok) {
          throw new Error("Failed to fetch.")
        }
        handleClose()
        props.loadPage()
      }) 
      .catch(error => {

        console.log(error)
      })
  }

  return (
    <div> 
    {
    editMode===true?(
          <IconButton onClick = {handleOpen}>
        <EditIcon></EditIcon>
      </IconButton>

    ):(
         <button type="button" onClick={handleOpen}>
        Add Task
      </button>
    )
    }

    
    

     
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Do it!</h2>
          <TextField
          label="Task"
          id="outlined-start-adornment"
          className={classes.textField}
          variant="outlined" 
          defaultValue = {text}
          onChange = {(event)=>{setText(event.target.value)}}>

          </TextField>
          <div>
          <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
          <Button variant="contained" color="primary"onClick={handleClose} >Cancel</Button>


          
          
          </div>

 
         
        </div>
      </Modal>
    </div>
  );
}
