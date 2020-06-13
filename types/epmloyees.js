const gnx = require("@simtlix/gnx");
const Employees = require("../models/employees").Employees;
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt } = graphql;
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
      UPDATE: [CantRepeatDni],
      DELETE:[CantDeleteEmployeeWithSalary]
    },
  },
  fields: () => ({
    id: { type: GraphQLID },
    dni: { type: GraphQLInt },
    birth_date: { type: GraphQLDate },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    hire_date: { type: GraphQLDate },
    gender: { type: SexTypeEnum },
  }),
});

gnx.connect(Employees, EmployeesType, "employee", "employees");

module.exports = EmployeesType;
