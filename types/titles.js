const gnx = require("@simtlix/gnx");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt } = graphql;
const { DateValidator } = require("../validators/time.validator");
const {CantHavetwoTitlesInSameTimeFrame} = require('../validators/title.validator');
const Title = require("../models/titles").Title;
const Employees = require("../models/employees").Employees;
const employeeType = require("./epmloyees");
const { GraphQLDate } = require('graphql-iso-date');
const titlesType = new GraphQLObjectType({
  name: "titleType",
  description: "represents titles",
  extensions: {
    validations: {
      CREATE: [DateValidator,CantHavetwoTitlesInSameTimeFrame]
    },
  },
  fields: () => ({
    id: { type: GraphQLID },
    employee: {
      type: employeeType,
      extensions: {
        relation: {
          connectionField: "empID",
          embedded: false,
        },
      },
      resolve(parent, args) {
        return Employees.findById(parent.empID);
      },
    },
    title: { type: GraphQLString },
    from_date: { type: GraphQLDate },
    to_date: { type: GraphQLDate },
  }),
});

gnx.connect(Title, titlesType, "Title", "Titles");

module.exports = titlesType;
