const { ApolloServer, gql } = require('apollo-server');

const attributes = require('./data/attributes.json');
const countries = require('./data/countries.json');
const properties = require('./data/properties.json');

// For more information on GraphQL see: https://graphql.org/learn/schema/
const typeDefs = gql`
  enum PropertyType {
    Castle
    Hotel
  }

  type Identifier {
    id: ID!
    name: String!
  }

  type Attribute {
    type: PropertyType!
    upgrades: [Identifier!]
    guestAttributes: [Identifier!]
  }

  type Property {
    type: PropertyType!
    id: ID!
    name: String!
    description: String
    availableRooms: Int!
    amenities: [String!]
  }

  input Guest {
    name: String!
    age: Int!
    attributes: [String!]
  }

  input Reservation {
    propertyId: String!
    name: String!
    country: String!
    address: String!
    city: String!
    state: String!
    zipcode: String!
    guests: [Guest!]
    upgrades: [String!]
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the following queries are defined which will be fulfilled by the
  # resolvers defined below:
  #  attributes -> ./data/attributes.json - defines the global metadata associated with each Property Type
  #  countries -> ./data/countries.json - list of all country names to use for the reservation
  #  properties -> ./data/properties.json - list of all the properties available for reservations
  type Query {
    attributes: [Attribute!]!
    countries: [String!]!
    properties: [Property!]!
  }

  # The "Mutation" type allows for clients to make changes.  In our case, we defined a single
  # mutation called "reserve" which will allow users to reserve properties.  A simple boolean of true/false
  # will be returned if the operation is successful.
  type Mutation {
    reserve(reservation: Reservation): Boolean!
  }
`;

const resolvers = {
  // Documentation: https://www.apollographql.com/docs/tutorial/resolvers/
  //                https://www.apollographql.com/docs/apollo-server/data/resolvers/
  Query: {
    attributes: () => attributes,
    countries: () => countries,
    properties: () => properties
  },
  // Documentation: https://www.apollographql.com/docs/tutorial/mutation-resolvers/
  Mutation: {
    reserve: (parent, args, context, info) => {
      const { reservation } = args;

      console.log(' server received reservation: ', reservation);

      return true;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
