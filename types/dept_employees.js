const gnx = require("@simtlix/gnx");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLID, GraphQLList, GraphQLString } = graphql;
const { DateValidator } = require("../validators/time.validator");
const { GraphQLDate } = require("graphql-iso-date");

const DeptEmployees = require("../models/dept_employee").DeptEmployee;
const Employees = require("../models/employees").Employees;
const Departments = require("../models/departments").Department;

const employeeType = require("./epmloyees");
const departmentType = require("./departments");
const {
  EmployeesCantBeOnTwoDeptsAtSameTime, CantDeleteWithChildEmployees,
} = require("../validators/dept_employee.validator");

const deptEmployeeType = new GraphQLObjectType({
  name: "deptEmployeeType",
  description: "represents deptEmlpoyee",
  extensions: {
    validations: {
      CREATE: [DateValidator, EmployeesCantBeOnTwoDeptsAtSameTime],
      DELETE:[CantDeleteWithChildEmployees]
    },
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
    },
    employee: {
      type: employeeType,
      extensions: {
        relation: {
          connectionField: "empID",
          embedded: false,
        },
      },
      resolve(parent,args){
        return Employees.findById(parent.empID)
      }
    },
    from_date: { type: GraphQLDate },
    to_date: { type: GraphQLDate },
  }),
});
gnx.connect(DeptEmployees, deptEmployeeType, "deptEmployee", "deptsEmployee");

module.exports = deptEmployeeType;
