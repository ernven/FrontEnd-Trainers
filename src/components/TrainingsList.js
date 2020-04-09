import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';

import Table from './Table';
import DeleteTraining from './DeleteTraining';

export default function CustomerList() {
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [counter, setCounter] = useState(0);

    const moment = require('moment');

    useEffect(()=> {
        const getTrainings = () => {
            fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(responseData => setData(responseData))
            .catch(err => console.error(err))
        }
        getTrainings();
    }, [counter])

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
            accessor: 'id',
            sortable: false,
            Cell: data => <div>
                            <DeleteTraining url={'https://customerrest.herokuapp.com/api/trainings/' + data.cell.value} deleteTraining={deleteTraining} />
                        </div>
        },{
            Header: 'Activity',
            accessor: 'activity'
        },{
            Header: 'Date',
            accessor: 'date',
            Cell: row => moment(row.cell.value).format('DD.MM.YYYY h:mm a')
        },{
            Header: 'Duration',
            accessor: 'duration'
        },{
            Header: 'Customer',
            accessor: 'customer',
            Cell: row => row.cell === null ? "Undefined" : row.cell.value.firstname + " " + row.cell.value.lastname
        }
    ], [moment, deleteTraining])

    const dataMemo = useMemo(() => data, [data])

    return (
        <div>
            <AppBar position='static' style={{ background: '#ffffff', zIndex: 1 }} >
                <Toolbar>
                <Typography variant='h6' style={{ color: '#000000', paddingLeft: 6 }} >
                    Trainings
                </Typography>
                </Toolbar>
            </AppBar>
            <Table columns={columns} data={dataMemo} />
            <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={handleClose}
                message={message} />
        </div>
    );
}