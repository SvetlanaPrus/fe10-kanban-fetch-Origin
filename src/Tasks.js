import React from "react";
import OneTask from "./OneTask";


export default function Tasks(props) {

    const {header, tasks,deleteTask,statuses,updateTask} = props;

    // const useStyles = makeStyles((theme) => ({
    //     root: {
    //         // '& > *': {margin: theme.spacing(1)},
    //         // flexGrow: 1,
    //         display: "flow",
    //         padding: 20,
    //     },
    //     paper: {
    //         padding: theme.spacing(1),
    //         textAlign: 'center',
    //         color: theme.palette.text.secondary,
    //     },
    // }));
    //
    // const classes = useStyles();

    return (
        <div>
            <h2>{header}</h2>
            <hr/>

                {tasks.filter(item => item.status === header.toLowerCase())
                    .sort((a,b) => a.priority - b.priority)
                    .map(el =>
                        <p key={el._id}>
                            <OneTask el={el} deleteTask={deleteTask} statuses={statuses} updateTask={updateTask}/>
                        </p>
                    )}
        </div>
    )
}