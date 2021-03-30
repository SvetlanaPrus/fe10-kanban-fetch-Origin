import React from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {makeStyles} from "@material-ui/core/styles";

export default function ModalDelete(props){

    const {open,setOpen,deleteTask,el} = props;

    const handleClose = () => {
        setOpen(false);
    };

    const useStyles = makeStyles({
        pos: {
            color: "red",
            justify: "flex-end",
        },
    });

    const classes = useStyles();

        return(
            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title"> {"Delete Item?"} </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <hr/>
                            Confirming this action you allow the system to delete this task from the Database.
                            Notice that it will be removed permanently.
                            <br/>
                            <p className={classes.pos}> Tasks name: "{el.name}" </p>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Disagree
                        </Button>
                        <Button onClick={() => deleteTask(el._id)} color="secondary" autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
    )
}