import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Input from './Input'
import {baseEndPoint, currentAPI} from './const'

export default function ToDoItem(props) {
  
const handleDelete = ()=>{
   let method = "DELETE"

  fetch(`${baseEndPoint}${currentAPI}/items/${props.todo._id}`,{
    method: method, 
     headers: {
            'Content-Type': "application/json"
          },
         
  
        })
        .then(httpResult => {
  
          if (!httpResult.ok) {
            throw new Error("Failed to fetch.")
          }
         props.loadPage()
        }) 
        .catch(error => {
  
          console.log(error)
        })
    }
  

  
  // fetch for delete here
  
  return (
   <React.Fragment>
      <ListItem>
        <ListItemText primary={props.todo.text} />
        <Input loadPage={props.loadPage} todo={props.todo}></Input>
      <IconButton onClick = {handleDelete}>
        <DeleteIcon></DeleteIcon>
      </IconButton>

      </ListItem>
      <Divider />
   </React.Fragment>      
  );
}
