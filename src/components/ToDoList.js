import React from 'react'
import ToDoItem from './ToDoItem'
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import {baseEndPoint, currentAPI} from './const'
import Input from './Input'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    'text-align': 'center'
  },
}));
export default function ToDoList() {
  const classes = useStyles();
  let [list, setList] = React.useState([])
  const loadPage = () => {

    fetch(`${baseEndPoint}${currentAPI}/items`, {
        method: "GET",
        headers: {
          'Content-Type': "application/json"
        }

      })
      .then(httpResult => {

        if (!httpResult.ok) {
          throw new Error("Failed to fetch.")
        }
        return httpResult.json()
      })
      .then(result => {

        setList(result)
      })
      .catch(error => {

        console.log(error)
      })
  }

  React.useEffect(
    loadPage, []
  )

  return ( 
  <div>
    <div className = 'Container'>
    <div className = 'List'>
    <h1> To-Do List </h1>
    <Input loadPage={loadPage}></Input>
    <List component = "nav"
    className = {
      classes.root
    }
    aria-label = "mailbox folders" >
      {
        list.map(item=>{
          return(
            <ToDoItem loadPage={loadPage} todo={item}></ToDoItem>
          )
        })

      }

    </List> 
    </div>
    </div>
    </div>

  )
}

