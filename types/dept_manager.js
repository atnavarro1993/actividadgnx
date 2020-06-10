const gnx = require("@simtlix/gnx");
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} = graphql;

const DeptManagers = require("../models/dept_manager").DeptManager;
const Employees = require("../models/employees").Employees;
const Departments = require("../models/departments").Department;

const employeeType = require("./epmloyees");
const departmentType = require("./departments");

const deptManagetType = new GraphQLObjectType({
  name: "deptManagerType",
  description: "represents deptManager",
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
    employees: {
      type: new GraphQLList(employeeType),
      extensions: {
        relation: {
          conecctionField: "empID",
          embedded: false,
        },
      },
      resolve(parent, args) {
        return Employees.find({ "empID": parent.id });
      },
    },
  }),
});

gnx.connect(DeptManagers, deptManagetType, "deptManager", "deptManagers");

module.exports = deptManagetType;
