const gnx = require("@simtlix/gnx");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLID, GraphQLList } = graphql;

const DeptEmployees = require("../models/dept_employee").DeptEmployee;
const Employees = require("../models/employees").Employees;
const Departments = require("../models/departments").Department;

const employeeType = require("./epmloyees");
const departmentType = require("./departments");

const deptEmployeeType = new GraphQLObjectType({
  name: "deptEmployeeType",
  description: "represents deptEmlpoyee",
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
      },
      resolve(parent, args) {
        return Employees.find({ empID: parent.id });
      },
    },
  }),
});
gnx.connect(DeptEmployees, deptEmployeeType, "deptEmployee", "deptsEmployee");

module.exports = deptEmployeeType;
