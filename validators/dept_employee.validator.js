const gnx = require("@simtlix/gnx");
const GNXError = gnx.GNXError;

const { DeptEmployee } = require("../models/dept_employee");
const { Employees } = require("../models/employees");

const EmployeesCantBeOnTwoDeptsAtSameTime = {
  validate: async function (typeName, originalObj, materializeObj) {
    const employeeAssigned = await DeptEmployee.find({
      empID: materializeObj.empID,
    });
    if (employeeAssigned.length > 0) {
      for (let i = 0; i < employeeAssigned.length; i++) {
        if (
          (materializeObj.from_date >= employeeAssigned[i].from_date &&
            materializeObj.from_date <= employeeAssigned[i].to_date) ||
          (materializeObj.to_date >= employeeAssigned[i].from_date &&
            materializeObj <= employeeAssigned[i].to_date) ||
          (materializeObj.from_date <= employeeAssigned[0].from_date &&
            materializeObj.to_date >=
              employeeAssigned[employeeAssigned.length - 1].to_date)
        ) {
          throw new EmployeeAssignmentOverlapsWithOtherTimeFrameError(typeName);
        }
      }
    }
  },
};

class EmployeeAssignmentOverlapsWithOtherTimeFrameError extends GNXError {
  constructor(typeName) {
    super(
      typeName,
      "EmployeeAssignmentOverlapsWithOtherTimeFrameError",
      "the employee assigned already as another dept assigned to in the same time frame"
    );
  }
}

const CantDeleteWithChildEmployees = {
  validate:async function(tymeName,originalObj,materializeObj){
    const employeeFound = await Employees.findOne({empID:originalObj});
    if (employeeFound){
      throw new CollectionWithChildError(tymeName)
    }
  }
}

class CollectionWithChildError extends GNXError{
  constructor(tymeName){
    super(tymeName,"CollectionWithChildError","the collection has one or more childs")
  }
}
module.exports={EmployeesCantBeOnTwoDeptsAtSameTime,CantDeleteWithChildEmployees};
