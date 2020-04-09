import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import { DatePicker, TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

export default function AddTraining(props) {
    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState({
        date: '', activity: '', duration: '', customer: ''
    });
    const [dateObject, setDateObject] = useState(new Date());
    const [counter, setCounter] = useState(0);

    const handleClickOpen = () => {
        setTraining({     
            date: '', activity: '', duration: '', customer: {}
        });
        setDateObject(new Date());
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const inputChanged = e => {
        setTraining({...training, [e.target.name]: e.target.value});
    }

    const dateChangeHandler = d => setDateObject(d);

    const setAndAdd = () => {
        const dateFormatted = dateObject.toISOString();
        setTraining({...training, date: dateFormatted, customer: props.customer});
        setCounter(counter + 1);
        handleClose();
    }

    useEffect(() => {
        if (training.date !== '') {
            props.addTraining(training);
        }
    // eslint-disable-next-line
    }, [counter]);

    return (
        <div style={{marginTop: 12, display: "flex", justifyContent: "center"}}>
            <Button
                color="primary"
                aria-label="Add Trainings"
                startIcon={<PlaylistAddIcon />}
                onClick={handleClickOpen}>
                Add New Training
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title" >
                <DialogTitle id="form-dialog-title" >
                    Add a new training session
                </DialogTitle>
                <DialogContent>
                    <MuiPickersUtilsProvider utils={MomentUtils} style={{paddingBottom: 25}}>
                        <DatePicker
                            label="Date"
                            name="dateObject"
                            format="DD.MM.YYYY"
                            value={dateObject}
                            onChange={d => dateChangeHandler(d)} />
                        <TimePicker
                            label="Time"
                            value={dateObject}
                            onChange={t => dateChangeHandler(t)}
                        />
                    </MuiPickersUtilsProvider>
                    <TextField
                        margin="dense"
                        name="duration"
                        value={training.duration}
                        onChange={e => inputChanged(e)}
                        label="Duration"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="activity"
                        value={training.activity}
                        onChange={e => inputChanged(e)}
                        label="Activity"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={setAndAdd} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}