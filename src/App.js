import './App.css';
import React, {useEffect, useState} from "react";
import Tasks from "./Tasks";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ModalCreate from "./ModalCreate";
import { v4 as uuidv4 } from 'uuid';

export default function App() {

  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {margin: theme.spacing(1)},
      flexGrow: 1,
      display: "flow",
      padding: 20,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      display: "flow",
      backgroundColor: "lightsteelblue",
    },
    textHeader: {
      color: theme.palette.text.secondary,
    },
    link: {
      color: "#303F9F",
    }
  }));

  const classes = useStyles();

  const statuses = ['Todo', 'Progress', 'Review', 'Done']
  const [tasks, setTasks] = useState([])

  useEffect(()=>{
    fetch('http://nazarov-kanban-server.herokuapp.com/card')
        .then(response => response.json())
        .then(json => setTasks([...tasks, ...json]))
        .catch(() => console.log("DB was not downloaded!"))
  },[])

  function deleteTask(id){
    const newArray = tasks.filter((el,i) => el._id !== id)
    setTasks(newArray)
  }

  ///////////////////////////////////////////
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const handleModalCreateOpen = () => {
    setOpenModalCreate(true);
  };

  ////////////////////////////////////////
  function createTask(date, newName, newDescription, newStatus, newPriority,setOpenModalCreate,
                      setNewName,setNewDescription,setNewStatus,setNewPriority){
    setTasks([...tasks, {
      id: uuidv4(),
      createdAt: date,
      name: newName,
      description: newDescription,
      status: newStatus,
      priority: newPriority
    }
  ])
    setOpenModalCreate(false)
    setNewName('')
    setNewDescription('')
    setNewStatus('')
    setNewPriority(+'')
  }

  //////////////////////////////////////
  function updateTask(id,updateDate,updateName,updateDescription,currentStatus,currentPriority,setOpenModalUpdate){
    const newList = tasks.filter(el => el._id !== id)
    setTasks([...newList, {
      updatedAt: updateDate,
      name: updateName,
      description: updateDescription,
      status: currentStatus,
      priority: currentPriority
    }])
    setOpenModalUpdate(false)
  }


  return (
      <div className="found">
        <div className={classes.root}>

          <h1 className={classes.textHeader}> KANBAN - ver.1 </h1>
          <h3 className={classes.textHeader}> * React, useEffect, useState, Material-ui, Fetch</h3>

          <h4>
            <a className={classes.link} href="http://nazarov-kanban-server.herokuapp.com/card"> ** nazarov-kanban-server.herokuapp </a>
          </h4>

          <Button onClick={handleModalCreateOpen} variant="contained" color="primary"> Create </Button>

          <Grid container spacing={1}>
            {statuses.map(el =>
                    <Grid container item xs={3} spacing={2}>
                      <Paper className={classes.paper}>
                          <Tasks header={el} tasks={tasks} deleteTask={deleteTask} statuses={statuses} updateTask={updateTask}/>
                      </Paper>
                    </Grid>
                //Comment: added "container" in 'Grid' (line 50), column was adjusted to Cards width
            )}
          </Grid>
          {openModalCreate && <ModalCreate createTask={createTask} statuses={statuses}
                                           openModalCreate={openModalCreate} setOpenModalCreate={setOpenModalCreate}/>}
        </div>
      </div>
  )
}

