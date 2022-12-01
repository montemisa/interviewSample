import React from "react";
import PropertyDetails from '../PropertyDetails';
import {render, screen} from '@testing-library/react';

const mockProperty = {
    id: 'mockId',
    type: 'Castle',
    name: 'mock castle name',
    description: 'mock description',
    availableRooms: 3,
    amenities: ['amenity1', 'amenity2'],
};

it("button should be enbabled if there are available rooms", () => {
    const {container} = render(
         <PropertyDetails 
             property={mockProperty} 
         />
     );
 
     expect(screen.getByRole('button').classList.contains('disabled')).toBe(false);
 });

it("button should be disabled if no available rooms", () => {
   const {container} = render(
        <PropertyDetails 
            property={{...mockProperty, availableRooms: 0}} 
        />
    );

    expect(screen.getByRole('button').classList.contains('disabled')).toBe(true);
});

