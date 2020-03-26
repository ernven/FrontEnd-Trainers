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
            Cell: row => moment(row.cell.value).format('DD.MM.YYYY h:mm a')
        },{
            Header: 'Activity',
            accessor: 'activity'
        },{
            Header: 'Duration',
            accessor: 'duration'
        }
    ], [moment])

    const dataMemo = useMemo(() => data, [data])

    return (
        <div>
            <AppBar position='static' style={{ background: '#ffffff', zIndex: 1 }} >
                <Toolbar>
                <Link to='/' >
                    <ArrowBackIcon style={{ color: '#000000', marginLeft: -12 }} />
                </Link>
                <Typography variant='h6' style={{ color: '#000000', paddingLeft: 6 }} >
                    Customer's trainings
                </Typography>
                </Toolbar>
            </AppBar>
            <Table columns={columns} data={dataMemo} />
        </div>
    );
}