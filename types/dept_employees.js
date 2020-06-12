const gnx = require("@simtlix/gnx");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLID, GraphQLList, GraphQLString } = graphql;
const { DateValidator } = require("../validators/time.validator");

const DeptEmployees = require("../models/dept_employee").DeptEmployee;
const Employees = require("../models/employees").Employees;
const Departments = require("../models/departments").Department;

const employeeType = require("./epmloyees");
const departmentType = require("./departments");

const deptEmployeeType = new GraphQLObjectType({
  name: "deptEmployeeType",
  description: "represents deptEmlpoyee",
  extensions:{
    validations:{
      'CREATE':[
        DateValidator
      ]
    }
  },
  fields: () => ({
    id: { type: GraphQLID },
    department: {
      type: departmentType,
      extensions: {
        relation: {
          connectionField: "deptID",
          embedded: false,
        },
      },
      resolve(parent, args) {
        return Departments.findById(parent.deptID);
      },
      employees: {
        type: new GraphQLList(employeeType),
        extensions: {
          relation: {
            connectionField: "empID",
            embedded: false,
          },
        },

        resolve(parent, args) {
          return Employees.find({ empID: parent.id });
        },
      },
      from_date: { type: GraphQLString },
      to_date: { type: GraphQLString },
    },
  }),
});
gnx.connect(DeptEmployees, deptEmployeeType, "deptEmployee", "deptsEmployee");

module.exports = deptEmployeeType;
