import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import ListIcon from '@material-ui/icons/List';

import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import DeleteCustomerAlert from "./DeleteCustomer";
import Table from './Table';

export default function CustomerList() {
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');

    const mainUrl = 'https://customerrest.herokuapp.com/api/';

    useEffect(() => getCustomers(), [])

    const getCustomers = () => {
        fetch(mainUrl + 'customers')
        .then(response => response.json())
        .then(responseData => setData(responseData.content))
        .catch(err => console.error(err))
    }

    const addCustomer = (customer) => {
        fetch(mainUrl + 'customers', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
        .then(_ => {
            getCustomers();
            setMessage("New customer added!");
            setOpen(true);
        })
        .catch(err => console.error(err))
    }

    const editCustomer = useCallback((customer, url) => {
        fetch(url, {
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
        .then(_ => {
            getCustomers();
            setMessage("Customer info updated!");
            setOpen(true);
        })
        .catch(err => console.error(err))
    }, [])

    const deleteCustomer = useCallback((customerURL) => {
        fetch(customerURL, {method: 'DELETE'})
        .then(_ => {
            getCustomers()
            setMessage("Customer deleted!");
            setOpen(true);
        })
        .catch(err => console.error(err))
    }, [])

    const handleClose = () => {
        setOpen(false);
    }
    
    const columns = useMemo(() => [
        {
            Header: 'Actions',
            Filter: '',
            sortable: false,
            Cell: data => <div style={{display: 'flex', flexDirection: 'row'}}>
                            <EditCustomer customer={data.row.original} editCustomer={editCustomer} />
                            <DeleteCustomerAlert url={data.row.original.links[0].href} deleteCustomer={deleteCustomer} />
                        </div>
        },{
            Header: 'First name',
            accessor: 'firstname'
        },{
            Header: 'Last name',
            accessor: 'lastname'
        },{
            Header: 'Address',
            accessor: 'streetaddress'
        },{
            Header: 'Postcode',
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
            Header: 'Trainings',
            Filter: '',
            sortable: false,
            Cell: data => <div>
                            <Link to={{ pathname: '/personal', trainingsUrl: data.row.original.links[2].href, customerUrl: data.row.original.links[0].href,
                                    customerName: data.row.original.firstname + ' ' + data.row.original.lastname }}
                                style={{ textDecoration: 'none' }} >
                                <Button
                                        style={{marginRight: 15}}
                                        aria-label="View Trainings"
                                        startIcon={<ListIcon />}>
                                    View
                                </Button>
                            </Link>
                        </div>
        }
    ], [deleteCustomer, editCustomer])

    const dataMemo = useMemo(() => data, [data])

    return (
        <div>
            <AppBar position='static' style={{ background: '#ffffff', zIndex: 1 }} >
                <Toolbar>
                <Typography variant='h6' style={{ color: '#000000', paddingLeft: 6 }} >
                    Customers
                </Typography>
                </Toolbar>
            </AppBar>
            <AddCustomer addCustomer={addCustomer} />
            <Table columns={columns} data={dataMemo} />
            <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={handleClose}
                message={message} />
        </div>
    );
}