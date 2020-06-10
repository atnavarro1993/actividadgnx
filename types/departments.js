const gnx = require("@simtlix/gnx");
const Department = require("../models/departments").Department;
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLID, GraphQLString } = graphql;

const DepartmentsType = new GraphQLObjectType({
  name: "departmentType",
  description: "represents departments",
  fields: () => ({
    id: { type: GraphQLID },
    dept_name: { type: GraphQLString },
  }),
});

gnx.connect(Department, DepartmentsType, "department", "departments");
module.exports = DepartmentsType;
