import React, { useEffect, useState, useMemo } from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { Link } from 'react-router-dom'

import Table from './Table'

export default function CustomerList(props) {
    const [data, setData] = useState([]);

    const moment = require('moment');

    useEffect(() => getTrainings(), [])

    const getTrainings = () => {
        fetch(props.location.url)
        .then(response => response.json())
        .then(responseData => setData(responseData.content))
        .catch(err => console.error(err))
    }

    const columns = useMemo(() => [
        {
            Header: 'Date',
            accessor: 'date',
            Cell: row => moment(row.cell.value).format('DD.MM.YYYY')
        },{
            Header: 'Duration',
            accessor: 'duration'
        },{
            Header: 'Activity',
            accessor: 'activity'
        }
    ], [moment])

    const dataMemo = useMemo(() => data, [data])

    return (
        <div>
            <AppBar position="static" style={{ background: '#ffffff' }} >
                <Toolbar>
                <Link to='/' >
                    <ArrowBackIcon style={{ color: '#000000', marginLeft: -12 }} />
                </Link>
                <Typography variant='h6' style={{ color: '#000000', paddingLeft: 6 }} >
                    Trainings
                </Typography>
                </Toolbar>
            </AppBar>
            <Table columns={columns} data={dataMemo} />
        </div>
    );
}