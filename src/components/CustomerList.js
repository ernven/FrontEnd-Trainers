import React, { useEffect, useState, useMemo } from 'react'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

import Table from './Table'

export default function CustomerList() {
    const [data, setData] = useState([]);

    useEffect(() => getCustomers(), [])

    const getCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(responseData => setData(responseData.content))
        .catch(err => console.error(err))
    }

    const columns = useMemo(() => [
        {
            Header: 'First name',
            accessor: 'firstname'
        },{
            Header: 'Last name',
            accessor: 'lastname'
        },{
            Header: 'Address',
            accessor: 'streetaddress'
        },{
            Header: 'Post Code',
            accessor: 'postcode'
        },{
            Header: 'City',
            accessor: 'city'
        },{
            Header: 'email',
            accessor: 'email'
        },{
            Header: 'Phone',
            accessor: 'phone'
        },{
            accessor: 'links[2].href',
            Filter: '',
            Cell: row => <Link to={{ pathname: '/trainings', url: row.cell.value }}
                            style={{ textDecoration: 'none' }} >
                            <Button size='small' color='primary' style={{ fontSize: '0.7rem'}} >
                                    View Trainings
                            </Button>
                        </Link>
        }
    ], [])

    const dataMemo = useMemo(() => data, [data])

    return (
        <div>
            <Table columns={columns} data={dataMemo} />
        </div>
    );
}