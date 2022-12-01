import React, {useState} from 'react';

import './propertyReservation.css';

export default function PropertyReservation(props) {
    const {property, onCancel, onSubmit, guestAttributes, countries, availableUpgrades} = props;
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState(countries[0]);
    const [zipcode, setZipcode] = useState('');
    const [guests, setGuests] = useState([]);
    const [upgrades, setUpgrades] = useState([]);

    const updateGuestName = (idx, name) => {
        guests[idx] = {...guests[idx], name};
        setGuests([...guests]);
    }

    const updateGuestAge = (idx, age) => {
        guests[idx] = {...guests[idx], age};
        setGuests([...guests]);
    }

    const addGuest = () => {
        setGuests([...guests, {name: '', age: '', attributes: []}])
    }

    const removeGuest = (idx) => {
        const newGuests = guests.filter((v,i,arr) => i !== idx)
        setGuests(newGuests)
    }

    const updateGuestAttributes = (idx, attributeId) => {
        const attrs = guests[idx].attributes;
        if (attrs.includes(attributeId)) {
            const attributes = attrs.filter((v, i, arr) => v !== attributeId);
            guests[idx] = {...guests[idx], attributes};
        } else {
            const attributes = [...attrs, attributeId];
            guests[idx] = {...guests[idx], attributes};
        }
        setGuests([...guests]);
    }

    const updateUpgrades = (upgradeId) => {
        if (upgrades.includes(upgradeId)) {
            setUpgrades(upgrades.filter((v, i, arr) => v !== upgradeId));
        } else {
            setUpgrades([...upgrades, upgradeId]);
        }
    }

    const showGuest = (guest, idx) => {
        return(
            <div className='propertyReservationGuest' key={idx}>
                <div className='propertyReservationFormInput'>
                    Name
                    <input type="text"  value={guest.name} onChange={(e) => updateGuestName(idx, e.currentTarget.value)}/>
                </div>
                <div className='propertyReservationFormInput'>
                    Age
                    <input type="number"  value={guest.age} onChange={(e) => updateGuestAge(idx, parseInt(e.currentTarget.value))}/>
                </div>
                
                { guestAttributes && 
                    <>
                        <div>Attributes</div>
                        {guestAttributes.map(guestAttr => 
                            <div className='propertyReservationFormInput' key={guestAttr.id}>
                                <label> 
                                <input 
                            
                                    type="checkbox"  
                                    name={guestAttr.id} 
                                    checked={guest.attributes.includes(guestAttr.id)}
                                    onChange={(e) => updateGuestAttributes(idx, guestAttr.id)}
                                />
                                    {guestAttr.name}
                                </label>
                            </div>
                        )}
                    </>
                }
                <button type="button" onClick={() => removeGuest(idx)}><span>Remove this guest</span></button>
            </div>
        );
    }

    const submit = () => {
        if (property.availableRooms <= 0) {
            console.log("No rooms available at this property");
            return;
        }
        const details = {
            propertyId: property.id,
            name,
            country,
            address,
            city,
            state,
            zipcode,
            guests,
            upgrades,
        }
        onSubmit(details);
    }

    const formValid = name && country && address && city && state && zipcode && guests.every(g => g.name && g.age);
    

    return (
        <div className='propertyReservation'>
            <div className='propertyReservationHeader'>
                <h1>{property.name}</h1>
                <p>{property.description}</p>
            </div>
            <hr />
            <div className='propertyReservationFormUpgradesAndAmenities'>
                {upgrades &&
                    <div>
                        <h3>Available Upgrades</h3>
                        <div className='propertyReservationFormOptions'>
                            {availableUpgrades.map(upgrade => 
                                <div className='propertyReservationFormOption' key={upgrade.id}>
                                    <label> 
                                    <input 
                                        className = 'propertyReservationUpgradeOption'
                                        type="checkbox"  
                                        name={upgrade.id} 
                                        checked={upgrades.includes(upgrade.id)}
                                        onChange={(e) => updateUpgrades(upgrade.id)}
                                    />
                                        {upgrade.name}
                                    </label>
                                </div>
                            )}
                        </div>
                    </div>
                }
                {property.amenities && 
                    <div>
                        <h3>Featured Amenities</h3>
                            <div className='propertyReservationFormOptions'>
                                {property.amenities.map(amenity => <li className='propertyReservationFormOption propertyReservationAmenity' key={amenity}>{amenity}</li>)}
                            </div>

                    </div>
                }
            </div>
            <div>
                <div className='propertyReservationFormInput'>
                    Name
                    <input type="text" name="name" value={name} onChange={(e) => setName(e.currentTarget.value)}/>
                </div>
                <div className='propertyReservationFormInput'>
                    Address
                    <input type="text" name="address" value={address} onChange={(e) => setAddress(e.currentTarget.value)}/>
                </div>
                <div className='propertyReservationFormInput'>
                    City
                    <input type="text" name="city" value={city} onChange={(e) => setCity(e.currentTarget.value)}/>
                </div>
                <div className='propertyReservationFormInput'>
                    State
                    <input type="text" name="state" value={state} onChange={(e) => setState(e.currentTarget.value)}/>
                </div>
                <div className='propertyReservationFormInput'>
                    Zipcode
                    <input type="number" name="zipcode" value={zipcode} onChange={(e) => setZipcode(e.currentTarget.value)}/>
                </div>
                <div className='propertyReservationFormInput'>
                    Country
                    <select value={country} onChange={(e) => setCountry(e.currentTarget.value)}>
                        {
                            countries.map(c => <option key={c} value={c}>{c}</option> )
                        }
                    </select>
                </div>

                <div>
                    <h3>
                        Additional guests
                    </h3>
                    {
                        guests.map((guest, index) => showGuest(guest, index))
                    }
                    <button className="btn gray" type="button" onClick={addGuest}><span>Add Guest</span></button>

                </div>
            </div>
            <div className='propertyReservationFormButtons'>
                <button className="btn gray" type="button" onClick={onCancel}><span>Cancel</span></button>
                <button className="btn red" type="button" onClick={submit} disabled={!formValid}><span>Submit</span></button>
            </div>
        </div>
    );
}