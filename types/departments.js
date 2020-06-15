const gnx = require("@simtlix/gnx");
const Department = require("../models/departments").Department;
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLID, GraphQLString,GraphQLNonNull } = graphql;
const {
  CantRepeatName,
  CantDeleteIfChilds,
} = require("../validators/dept.validator");

const DepartmentsType = new GraphQLObjectType({
  name: "departmentType",
  description: "represents departments",
  extensions: {
    validations: {
      CREATE: [CantRepeatName],
      UPDATE: [CantRepeatName],
      DELETE: [CantDeleteIfChilds],
    },
  },
  fields: () => ({
    id: { type: GraphQLID },
    dept_name: { type: GraphQLNonNull( GraphQLString) }
  }),
});

gnx.connect(Department, DepartmentsType, "department", "departments");
module.exports = DepartmentsType;
const deptEmployeeType = require("./dept_employees");
