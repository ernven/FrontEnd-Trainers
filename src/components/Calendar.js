import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import '@fullcalendar/list/main.css';

export default function Calendar() {
    const [trainings, setTrainings] = useState([{
        id: 0, title: '', start: '', end: ''
    }]);

    const moment = require('moment');

    // eslint-disable-next-line
    useEffect(() => getTrainings(), [])

    const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(responseData => {
            let responseDataFormatted = responseData.map(
                entry => {
                    let endDate = moment(entry.date).add(entry.duration, 'm').toISOString();
                    return {
                        id: entry.id,
                        title: entry.activity + ' / ' + entry.customer.firstname + ' ' + entry.customer.lastname,
                        start: entry.date,
                        end: endDate
                    };
                }
            );
            setTrainings(responseDataFormatted);
        })
        .catch(err => console.error(err))
    }

    return (
        <div style={{ display: 'flex', margin: 'auto', height: '85vh', width: '85vw', padding: 25, paddingRight: 55 }}>
            <FullCalendar
                plugins={[ dayGridPlugin, timeGridPlugin, listPlugin ]}     
                header={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth, timeGridWeek, timeGridDay, listMonth'
                }}
                defaultView="dayGridMonth"
                height="parent"
                events={trainings} />
        </div>
    )
}