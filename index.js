const { ApolloServer, gql } = require("apollo-server");
const GraphQLJSON = require("graphql-type-json");
const mongoose = require("mongoose");

// Mongoose schemas
const CountrySchema = new mongoose.Schema({
  _id: String,
  name: String,
  code: String,
  regions: Array
});
const RegionSchema = new mongoose.Schema({
  _id: String,
  name: String,
  municipalities: Array
});

const MunicipalSchema = new mongoose.Schema({
  _id: String,
  name: String,
  notes: String,
  mixedType: { type: mongoose.Schema.Types.Mixed, required: false }
});

// Mongoose Models
const CountryModel = mongoose.model("countries", CountrySchema);
const RegionModel = mongoose.model("regions", RegionSchema);
const MunicipalModel = mongoose.model("manicipalies", MunicipalSchema);

// Graphql Schema with types
const typeDefs = gql`
  # Custom json scalar for 'mixed type' in mongodb
  scalar JSON

  type Municipal {
    _id: String
    regionId: String
    name: String
    notes: String
    mixedType: JSON
  }

  type Region {
    _id: String
    countryId: String
    name: String
    municipalities: [Municipal]
  }

  type Country {
    _id: String
    name: String
    code: String
    regions: [Region]
  }

  type Query {
    getCountries: [Country]
    getRegion(id: String!): [Region]
  }
`;

// Resolvers
const resolvers = {
  JSON: GraphQLJSON,
  Query: {
    getCountries: async (parent, args, c) => await CountryModel.find({}),
    getRegion: async (parent, args, c) =>
      await RegionModel.find({ _id: args.id })
  },
  Country: {
    regions: async (country, args, c) =>
      await RegionModel.find({ _id: { $in: country.regions } })
  },
  Region: {
    Municipal: async (location, args, c) =>
      await MunicipalModel.find({ _id: { $in: location.Municipal } })
  }
};

// Apollo Graphql server setup
function initApolloServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
}

// Connect to mongodb
async function connectToDatabase() {
  try {
    // Connect to some country database
    await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
    console.log("Connected to server");
  } catch (err) {
    console.log("Could not connect to database", err);
  }
}

async function init() {
  // Connect to database
  await connectToDatabase();
  // Initiate apollo graphql server
  initApolloServer();
}
init();
