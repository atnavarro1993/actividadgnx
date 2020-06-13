const gnx = require("@simtlix/gnx");
const GNXError = gnx.GNXError;
const { Department } = require("../models/departments");
const { DeptManager } = require("../models/dept_manager");
const { DeptEmployee } = require("../models/dept_employee");
const CantRepeatName = {
  validate: async function (typeName, originalObj, materializeObj) {
    const DeptFound = await Department.findOne({
      dept_name: materializeObj.dept_name,
    });
    if (DeptFound && DeptFound._id != materializeObj.id) {
      throw new DepartmentNameAlreadyInUseError(typeName);
    }
  },
};

class DepartmentNameAlreadyInUseError extends GNXError {
  constructor(typeName) {
    super(
      typeName,
      "DepartmentNameAlreadyInUseError",
      "The name of the department is already in use"
    );
  }
}

const CantDeleteIfChilds = {
  validate: async function (typeName, originalObj, materializeObj) {
    const managerFound = await DeptManager.findOne({ deptID: originalObj });
    const employeeFound = await DeptEmployee.findOne({ deptID: originalObj });
    if (managerFound || employeeFound) {
      throw new TheDepartmentHasOneOrMoreChilds(typeName);
    }
  },
};


class TheDepartmentHasOneOrMoreChilds extends GNXError {
  constructor(typeName) {
    super(
      typeName,
      "TheDepartmentHasOneOrMoreManagerChilds",
      "unable to delete collection due to having one or more childs"
    );
  }
}

module.exports = {
  CantRepeatName,
  CantDeleteIfChilds,
};
