RGT Code Exercise
===

## Project Setup

### Prerequisites

- Download and install [Node.js](https://nodejs.org/en/download/) with NPM

```
# install project dependencies
npm i

# start the server and client application
npm start
```

After launching, point your web browser to http://localhost:3000 (use incognito if you run into security issues).  A GraphQL playground is also available at: http://localhost:4000 to test queries.

### Project Structure


client code is in the `src` directory and server code is in the `server` directory.

## Problem Statement

Our hotel chain is moving to an air-bnb like model. We have both "hotels" and "castles" that we need to allow customers to reserve. Our GraphQL API is serving both datasets to the UI as **properties**.
Build a single form that allows a user to reserve a hotel, or a castle. The castle data model differs slightly from our existing hotels.
While we work primarily in React, **you are free to leverage whichever framework works best for you**.

### High Level Requirements:

1.  User can select a property to reserve (Castle or Hotel) based on the data provided by the **properties** query. With this boilerplate, you should already see the data within the JavaScript console.

2.  User can see the associated property **amenities** (a simple list is fine) as the property selection is changed.
3.  User can submit a form with the relevant reservation (model is dictated by the **reserve** mutation. See the **Reservation** input type in **server/index.js** for details on the structure).
4.  User can add a list of guests that will join them (no upper bound).
5.  Basic validation should be present in the implementation - for example, if the **roomsAvailable** for the selected property is **0**, then the user cannot reserve the property. The number of guests does **_NOT_** impact the calculation.
6.  The Reservation includes a country field - the UI should leverage the data returned from the **countries** GraphQL query.
7.  Based on the property type selected, there might be **upgrades** that the user can select. These upgrades apply to all properties of the corresponding type. They can be found in the **attributes** query matching on the **type** field.  Upon selecting, the **id** should be supplied within the array of **upgrades** on the reservation.
8.  Based on the property type selected, there might be **attributes** that the user can associate with guests (guestAttributes). For the reservation, for each guest, these attributes can be shown as simple checkboxes. Upon selecting, the **id** should be supplied within the array of **attributes** for the guests.

### Take a step back

**_We understand that this is a time consuming activity and you won't be able to produce a production grade application in 3-4 hours. If there's an aspect that you didn't have time to get to, or an area for improvement, feel free to write some quick thoughts on how you would have approached the problem, given more time. We're more interested in how you think through code, than how fast you write code._**

#### Some things you do not have to worry about:

*   Reservations do not need to persist or be displayed back through the UI. However, the form data should be sent to the server.
*   Feel free to change as little or as much of the provided code ...you can delete this entire project and start from scratch if you wanted.
*   The solution should include at least one unit, smoke, or integration test.
*   Optimizations or more thorough approaches could be simply documented rather than implemented
*   Style will not be a requirement. You're free to use a design system if you would like but plain old HTML elements are just fine.



### My notes

In the initial view that lists the properties on cards it has a button on there. Ideally we could remove the button and just have the card be clickable but without any images to show the cards look empty so I left the button because it looks better.

I added a couple unit tests for the components I wrote. In a real app I would definitely add more tests. Test that the submit doesn't work if the form is not valid. Test that hitting submit results in the correct request object being sent etc. Would also want to test that the UI is robust enough to handle large text strings for some  of the values like amenities or upgrades.

There's also not a lot of error handling here. We basically assume the call will be successful. That would definitely need to be more robust in a real app.

There's also some CSS in App.css that would be better off in a separate file more specific to the component the styles apply to.

I know the component is called mock-do-not-use but it looks so much better with it so I couldn't resist =) (please don't hate me).

I installed a few differnt packages, just fyi.

Removed the node_modules and then zipped folder.

