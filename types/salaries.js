const gnx = require("@simtlix/gnx");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt ,GraphQLNonNull} = graphql;
const { DateValidator } = require("../validators/time.validator");
const { GraphQLDate } = require("graphql-iso-date");

const Salaries = require("../models/salaries").Salary;
const Employees = require("../models/employees").Employees;
const employeeType = require("./epmloyees");
const { SalaryCantBeNegative } = require("../validators/salary.validator");

const SalariesType = new GraphQLObjectType({
  name: "salaryType",
  description: "represents salaries",
  extensions: {
    validations: {
      CREATE: [DateValidator, SalaryCantBeNegative],
      UPDATE: [DateValidator, SalaryCantBeNegative]
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
    salary: { type: GraphQLNonNull (GraphQLInt) },
    from_date: { type:  GraphQLNonNull( GraphQLDate)},
    to_date: { type: GraphQLNonNull( GraphQLDate) },
  }),
});

gnx.connect(Salaries, SalariesType, "Salary", "salaries");

module.exports = SalariesType;
