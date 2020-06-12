const gnx = require("@simtlix/gnx");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt } = graphql;
const { DateValidator } = require("../validators/time.validator");

const Salaries = require("../models/salaries").Salary;
const Employees = require("../models/employees").Employees;
const employeeType = require("./epmloyees");

const SalariesType = new GraphQLObjectType({
  name: "salaryType",
  description: "represents salaries",
  extensions:{
    validations:{
      'CREATE':[
        DateValidator
      ]
    }
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
    salary: { type: GraphQLInt },
    from_date: { type: GraphQLString },
    to_date: { type: GraphQLString },
  }),
});

gnx.connect(Salaries, SalariesType, "Salary", "salaries");

module.exports = SalariesType;
