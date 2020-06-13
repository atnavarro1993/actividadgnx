const gnx = require("@simtlix/gnx");
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} = graphql;
const { DateValidator } = require("../validators/time.validator");
const { GraphQLDate } = require("graphql-iso-date");
const {
  ManagerCantHaveOverlapingTimeFrames,
  CantDeleteWithChildManagers,
} = require("../validators/dept_manager.validator");

const DeptManagers = require("../models/dept_manager").DeptManager;
const Employees = require("../models/employees").Employees;
const Departments = require("../models/departments").Department;

const employeeType = require("./epmloyees");
const departmentType = require("./departments");

const deptManagetType = new GraphQLObjectType({
  name: "deptManagerType",
  description: "represents deptManager",
  extensions: {
    validations: {
      CREATE: [DateValidator, ManagerCantHaveOverlapingTimeFrames],
      UPDATE: [DateValidator, ManagerCantHaveOverlapingTimeFrames],
      DELETE: [CantDeleteWithChildManagers],
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
    employees: {
      type: employeeType,
      extensions: {
        relation: {
          conecctionField: "empID",
          embedded: false,
        },
      },
      resolve(parent, args) {
        return Employees.findById({ empID: parent.id });
      },
    },
    from_date: { type: GraphQLDate },
    to_date: { type: GraphQLDate },
  }),
});

gnx.connect(DeptManagers, deptManagetType, "deptManager", "deptManagers");

module.exports = deptManagetType;
