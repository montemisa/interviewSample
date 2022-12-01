import React, {useState} from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';

import { MockDoNotUse } from './mock-do-not-use';
import PropertyDetails from './PropertyDetails';
import PropertyReservation from './PropertyReservation'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { v4 as uuidv4 } from 'uuid';
import { render } from '@testing-library/react';

// This component serves as an example of connectivity to the backend local GraphQL server
// After starting the project, there is a GraphQL playground available at: http://localhost:4000/
// More information about querying via Apollo can be found here: https://www.apollographql.com/docs/react/data/queries/

export const ReservationForm = () => {
  const [mySelectedProperty, setSelectedProperty] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [reserve, reservation] = useMutation(gql`
    mutation Reserve($reservation: Reservation) {
      reserve(reservation: $reservation)
    }
  `);

  const { loading: loadingAttributes, data: { attributes } = {} } = useQuery(gql`
    query GetAttributes {
      attributes {
        type
        upgrades {
          id
          name
        }
        guestAttributes {
          id
          name
        }
      }
    }
  `);

  const { loading: loadingCountries, data: { countries } = {} } = useQuery(gql`
    query GetCountries {
      countries
    }
  `);

  const { loading: loadingProperties, data: { properties } = {} } = useQuery(gql`
    query GetProperties {
      properties {
        type
        id
        name
        description
        availableRooms
        amenities
      }
    }
  `);

  const isLoading = loadingAttributes || loadingCountries || loadingProperties;

  if (isLoading) {
    return (
      <span>Loading...</span>
    );
  }

  // console.log('🚀 READY 🚀');
  // console.log(' attributes => ', attributes);
  // console.log(' countries => ', countries);
  // console.log(' properties => ', properties);

  const showPropertyList = () => {
    return (
      <div>
        <h1>Our Properties</h1>
        <div className='propertyList'>
          {properties.map(property => <PropertyDetails onReserve={() => setSelectedProperty(property)} key={property.name} property={property} />)}
        </div>
      </div>
    )
  }

  const onSubmit = (reservation) => {
    const req = {variables: {reservation}};
    reserve(req).then(res => setShowModal(true))
  }

  const showReservationForm = () => {
    const attrs = attributes.find((v,i,arr) => v.type === mySelectedProperty.type)
    const guestAttributes = attrs ? attrs.guestAttributes : null
    const availableUpgrades = attrs ? attrs.upgrades : null

    return (
      <PropertyReservation 
        property={mySelectedProperty} 
        onCancel={() => setSelectedProperty(null)} 
        onSubmit={onSubmit}
        guestAttributes={guestAttributes}
        availableUpgrades={availableUpgrades}
        countries={countries}
      /> 
    );
  }

  const renderModalMessage = () => {
    const confirmation = uuidv4();
    return (
      <div className='reservationConfirmationModal'>
        <h1>Thank you! Your stay has been booked!</h1>
        <p>Confirmation Number: {confirmation}</p>
        <p>We look forward to having you. Make sure to save this confirmation for your records.</p>
        <button className={`btn full red`} type="button" onClick={() => setShowModal(false)}><span>Close</span></button>
      </div>
    )
  }

  return (
    <div className="properties">
      <MockDoNotUse />      
      {mySelectedProperty ? showReservationForm() : showPropertyList()}
      <Popup open={showModal} modal>
        {renderModalMessage()}
      </Popup>
    </div>
  );
};
