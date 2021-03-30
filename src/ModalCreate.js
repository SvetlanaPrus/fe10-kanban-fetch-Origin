import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export default function ModalCreate(props) {

    const {openModalCreate, setOpenModalCreate, statuses, createTask} = props;

    const setPrior = [1,2,3,4,5];

    const useStyles = makeStyles((theme) => ({
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width: '25ch',
            },
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 200,
        },
    }));

    const classes = useStyles();

    //////////////////////////////////////
    const handleClose = () => {
        setOpenModalCreate(false);
    };

    //////////////////////////
    const [newPriority, setNewPriority] = useState(null);
    const handleCreatePriority = (event) => {
        setNewPriority(event.target.value);
    };
    //////////////////////////
    const [newStatus, setNewStatus] = useState('');
    const handleCreateStatus = (event) => {
        setNewStatus(event.target.value);
    }
    ///////////////////////////////
    const [newName, setNewName] = useState('');
    const handleCreateName = (event) => {
        setNewName(event.target.value);
    }
    ///////////////////////////////
    const [newDescription, setNewDescription] = useState('');
    const handleCreateDescription = (event) => {
        setNewDescription(event.target.value);
    }
    ////////////////////////////////
    const [date, setDate] = useState(new Date())
    const handleCreateDate = (event) => {
        setDate(event.target.value);
    }

    return (
        <div>
            <Dialog
                open={openModalCreate}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Note: All fields are required."}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <form className={classes.root} noValidate autoComplete="off">
                            <div>

                                <form className={classes.container} noValidate>
                                    <TextField
                                        defaultValue={date}
                                        onChange={handleCreateDate}
                                        id="datetime-local"
                                        label="Created at:"
                                        type="datetime-local"
                                        className={classes.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </form>

                                <TextField value={newName}
                                           onChange={handleCreateName}
                                           required id="standard-required" label="Name" defaultValue="Name"/>
                                <TextField value={newDescription}
                                           onChange={handleCreateDescription}
                                           required id="standard-required" label="Description" defaultValue="Description"/>

                                <FormControl className={classes.formControl}>
                                    <Select
                                        value={newPriority}
                                        onChange={handleCreatePriority}
                                        displayEmpty
                                        className={classes.selectEmpty}
                                        inputProps={{ 'aria-label': 'Without label' }}
                                    >
                                        <MenuItem value="" disabled>
                                            Priority
                                        </MenuItem>
                                        {setPrior.map((el,i) =>
                                            <MenuItem key={i} value={el}> {el} </MenuItem>
                                        )}
                                    </Select>
                                    <FormHelperText> Priority * </FormHelperText>
                                </FormControl>

                                <FormControl className={classes.formControl}>
                                    <Select
                                        value={newStatus}
                                        onChange={handleCreateStatus}
                                        displayEmpty
                                        className={classes.selectEmpty}
                                        inputProps={{ 'aria-label': 'Without label' }}
                                    >
                                        <MenuItem value="" disabled>
                                            Status
                                        </MenuItem>
                                        {statuses.map((el,i) =>
                                            <MenuItem key={i} value={el.toLowerCase()}> {el.toLowerCase()} </MenuItem>
                                        )}
                                    </Select>
                                    <FormHelperText> Status * </FormHelperText>
                                </FormControl>
                            </div>
                        </form>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => createTask(date, newName, newDescription, newStatus, newPriority, setOpenModalCreate,
                        setDate, setNewName,setNewDescription,setNewStatus,setNewPriority)}
                            color="primary" autoFocus>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}