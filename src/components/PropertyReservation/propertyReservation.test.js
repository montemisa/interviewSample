import React from "react";
import PropertyReservation from '../PropertyReservation';
import {render, screen} from '@testing-library/react';

const mockProperty = {
    id: 'mockId',
    type: 'Castle',
    name: 'mock castle name',
    description: 'mock description',
    availableRooms: 2,
    amenities: ['amenity1', 'amenity2'],
};

const mockCountries = ['country1', 'country2'];

const mockUpgrades = [
    {
        name: 'upgrade1',
        id: 'upgrade1Id',
    }, 
    {
        name: 'upgrade2',
        id: 'upgrade2Id',
     },
     {
         name: 'upgrade3',
         id: 'upgrade3Id',
     } 
];


it("renders with upgrades and amenities", () => {
   const {container} = render(
        <PropertyReservation 
            property={mockProperty} 
            countries={mockCountries} 
            availableUpgrades={mockUpgrades}
        />
    );

    mockUpgrades.map(upgrade =>
        expect(screen.getByText(upgrade.name)).toBeDefined
    );  
    mockProperty.amenities.map(amenity =>
        expect(screen.getByText(amenity)).toBeDefined
    ); 
})