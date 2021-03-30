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


export default function ModalUpdate(props) {

    const {openModalUpdate, setOpenModalUpdate, el, statuses,updateTask} = props;

    const priorities = [1, 2, 3, 4, 5]

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
    }));
    const classes = useStyles();

    //////////////////////////////////////
    const handleClose = () => {
        setOpenModalUpdate(false);
    };

    /////////////////////////////////
    const [updateDate, setUpdateDate] = useState(new Date())
    const handleUpdateDate = (event) => {
        setUpdateDate(event.target.value);
    }
    ///////////////////////////
    const [updateName, setUpdateName] = useState(el.name)
    const handleUpdateName = (event) => {
        setUpdateName(event.target.value);
    }

    ///////////////////////////
    const [updateDescription, setUpdateDescription] = useState(el.description)
    const handleUpdateDescription = (event) => {
        setUpdateDescription(event.target.value);
    }
    //////////////////////////
    const [currentPriority, setCurrentPriority] = useState(el.priority);
    const handleChangePriority = (event) => {
        setCurrentPriority(event.target.value);
    };

    //////////////////////////
    const [currentStatus, setCurrentStatus] = useState(el.status);
    const handleChangeStatus = (event) => {
        setCurrentStatus(event.target.value);
    };

    return (
        <div>
            <Dialog
                open={openModalUpdate}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"What do you want to change:"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <form className={classes.root} noValidate autoComplete="off">
                            <div>
                                <form className={classes.container} noValidate>
                                    <TextField
                                        defaultValue={updateDate}
                                        onChange={handleUpdateDate}
                                        id="datetime-local"
                                        label="Updated at:"
                                        type="datetime-local"
                                        className={classes.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </form>
                                <TextField value={updateName} onChange={handleUpdateName}
                                    required id="id-name" label="Name" defaultValue="Name"/>

                                <TextField value={updateDescription} onChange={handleUpdateDescription}
                                    required id="id-description" label="Description" defaultValue="Description"/>

                                <FormControl className={classes.formControl}>
                                    <Select
                                        value={currentPriority}
                                        onChange={handleChangePriority}
                                        displayEmpty
                                        className={classes.selectEmpty}
                                        inputProps={{ 'aria-label': 'Without label' }}
                                    >
                                        <MenuItem value="" disabled>
                                            Priority
                                        </MenuItem>
                                        {priorities.map((el,i) =>
                                            <MenuItem key={i} value={el}> {el} </MenuItem>
                                        )}
                                    </Select>
                                    <FormHelperText> Priority * </FormHelperText>
                                </FormControl>

                                <FormControl className={classes.formControl}>
                                    <Select
                                        value={currentStatus}
                                        onChange={handleChangeStatus}
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
                    <Button onClick={() => updateTask(el._id,updateDate,updateName,updateDescription,
                        currentStatus,currentPriority,setOpenModalUpdate)} color="primary" autoFocus>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}