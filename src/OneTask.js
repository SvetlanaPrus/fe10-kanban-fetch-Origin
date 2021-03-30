import React, {useState} from "react";
import 'fontsource-roboto';
import { makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ChangePriority from "./ChangePriority";
import ModalDelete from "./ModalDelete";
import ModalUpdate from "./ModalUpdate";

export default function OneTask(props){

    const {el, deleteTask,statuses,updateTask} = props;

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
            padding: 3,
        },
        title: {
            fontSize: 14,
        },
        pos: {
            marginBottom: 8,
            alignItems: "center",         //viravnivanie po vertikali v priority
            display: "flex",             //text "priority" stanovitsja na odnu stroku s vipad.menu
        },
        paper: {
            width: 255,
            height: 270,
            cursor: "grab",
            // margin: `${theme.spacing(1)}px auto`,
            // padding: theme.spacing(2),
            whiteSpace: "normal",
        },
    }));

    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    ////////////////////////////////////
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const handleModalUpdateOpen = () => {
        setOpenModalUpdate(true);
    };

    return(
        <div className={classes.root}>
        <Card className={classes.paper}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Status: {el.status}
                </Typography>
                <Typography variant="h5" component="h2">
                    {el.name}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    Priority: <ChangePriority prior={el.priority}/>
                </Typography>
                <Typography variant="body2" component="p">
                    <b>Description:</b><br/> {el.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button onClick={handleModalUpdateOpen} color="primary"> Update </Button>

                <Button onClick={handleClickOpen} color="secondary"> Delete </Button>

                <ModalUpdate openModalUpdate={openModalUpdate} setOpenModalUpdate={setOpenModalUpdate} el={el}
                             statuses={statuses} updateTask={updateTask}/>
                <ModalDelete open={open} setOpen={setOpen} deleteTask={deleteTask} el={el}/>
            </CardActions>
        </Card>
        </div>
    )
}