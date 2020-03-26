import React, { useEffect, useState, useMemo } from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core'

import Table from './Table'

export default function CustomerList() {
    const [data, setData] = useState([]);

    const moment = require('moment');

    useEffect(() => getTrainings(), [])

    const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(responseData => setData(responseData))
        .catch(err => console.error(err))
    }

    const columns = useMemo(() => [
        {
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
            Cell: row => row.cell.value.firstname + " " + row.cell.value.lastname
        }
    ], [moment])

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
        </div>
    );
}