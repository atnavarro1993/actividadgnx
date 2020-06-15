const gnx = require("@simtlix/gnx");
const Employees = require("../models/employees").Employees;
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} = graphql;
const SexTypeEnum = require("../enums/sex.enum");
const {
  CantRepeatDni,
  EmployeeMustHaveLegalAge,
  CantDeleteEmployeeWithSalary,
} = require("../validators/employee.validator");
const { GraphQLDate } = require("graphql-iso-date");

const EmployeesType = new GraphQLObjectType({
  name: "employeeType",
  description: "represents employees",
  extensions: {
    validations: {
      CREATE: [CantRepeatDni, EmployeeMustHaveLegalAge],
      UPDATE: [CantRepeatDni, EmployeeMustHaveLegalAge],
      DELETE: [CantDeleteEmployeeWithSalary],
    },
  },
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLID) },
    dni: { type: GraphQLNonNull(GraphQLInt) },
    birth_date: { type: GraphQLNonNull(GraphQLDate) },
    first_name: { type: GraphQLNonNull(GraphQLString) },
    last_name: { type: GraphQLNonNull(GraphQLString) },
    hire_date: { type: GraphQLNonNull(GraphQLDate) },
    gender: { type: GraphQLNonNull(SexTypeEnum) },
  }),
});

gnx.connect(Employees, EmployeesType, "employee", "employees");

module.exports = EmployeesType;
