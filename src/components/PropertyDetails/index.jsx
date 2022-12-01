import React from 'react'

import './propertyDetails.css'

export default function PropertyDetails(props) {
    const {property, onReserve} = props

    const makeReservation = () => {
        if (property.availableRooms <= 0) {
            console.log("No rooms currently available at this property");
            return;
        }
        onReserve()
    }

    return(
        <div className='propertyDetails' onClick={makeReservation}>
            <h3>{property.name}</h3>
            <div className='propertyDetailsDescription'>{property.description}</div>
            <div className='propertyDetailsRoomsAvail'><b>Rooms available: </b>{property.availableRooms}</div>
            <div className='propertyDetailsButton'>
                <button className={`btn full ${property.availableRooms > 0 ? 'red' : 'disabled'}`} type="button" onClick={makeReservation}><span>Make reservation</span></button>
            </div>
        </div>
    )

}