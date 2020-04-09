import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';

import Table from '../Table';
import DeleteTraining from './DeleteTraining';
import AddTraining from './AddTraining';

export default function CustomerList(props) {
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [customerName, setCustomerName] = useState('Customer')
    const [counter, setCounter] = useState(0);

    const moment = require('moment');

    useEffect(()=> {
        const getTrainings = () => {
            fetch(props.location.trainingsUrl)
            .then(response => response.json())
            .then(responseData => {
                setData(responseData.content);
                setCustomerName(props.location.customerName);
            })
            .catch(err => console.error(err))
        }
        getTrainings();
    }, [props.location.trainingsUrl, props.location.customerName, counter])

    const addTraining = useCallback((training) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(training)
        })
        .then(_ => {
            setCounter(c => c + 1);
            setMessage("New training added!");
            setOpen(true);
        })
        .catch(err => console.error(err))
    }, [])

    const deleteTraining = useCallback((trainingUrl) => {
        fetch(trainingUrl, {method: 'DELETE'})
        .then(_ => {
            setCounter(c => c + 1);
            setMessage("Training deleted!");
            setOpen(true);
        })
        .catch(err => console.error(err))
    }, [])

    const handleClose = () => {
        setOpen(false);
    }

    const columns = useMemo(() => [
        {
            Header: '',
            Filter: '',
            accessor: 'links[0].href',
            sortable: false,
            Cell: data => <div>
                            <DeleteTraining url={data.cell.value} deleteTraining={deleteTraining} />
                        </div>
        },{
            Header: 'Date',
            accessor: 'date',
            Cell: row => moment(row.cell.value).format('DD.MM.YYYY h:mm a')
        },{
            Header: 'Activity',
            accessor: 'activity'
        },{
            Header: 'Duration',
            accessor: 'duration'
        }
    ], [moment, deleteTraining])

    const dataMemo = useMemo(() => data, [data])

    return (
        <div>
            <AppBar position='static' style={{ background: '#ffffff', zIndex: 1 }} >
                <Toolbar>
                <Link to='/' >
                    <ArrowBackIcon style={{ color: '#000000', marginLeft: -12 }} />
                </Link>
                <Typography variant='h6' style={{ color: '#000000', paddingLeft: 6 }} >
                    {customerName}'s trainings
                </Typography>
                </Toolbar>
            </AppBar>
            <AddTraining customer={props.location.customerUrl} addTraining={addTraining} />
            <Table columns={columns} data={dataMemo} />
            <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={handleClose}
                message={message} />
        </div>
    );
}