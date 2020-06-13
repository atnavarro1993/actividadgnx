const gnx = require("@simtlix/gnx");
const GNXError = gnx.GNXError;

const { DeptManager } = require("../models/dept_manager");
const { Employees } = require("../models/employees");

const ManagerCantHaveOverlapingTimeFrames = {
  validate: async function (typeName, originalObj, materializeObj) {
    const managersAssigned = await DeptManager.find({
      deptID: materializeObj.deptID,
    });
    if (managersAssigned.length > 0) {
      for (let i = 0; i < managersAssigned.length; i++) {
        if (
          (materializeObj.from_date >= managersAssigned[i].from_date &&
            materializeObj.from_date <= managersAssigned[i].to_date) ||
          (materializeObj.to_date >= managersAssigned[i].from_date &&
            materializeObj <= managersAssigned[i].to_date) ||
          (materializeObj.from_date <= managersAssigned[0].from_date &&
            materializeObj.to_date >=
              managersAssigned[managersAssigned.length - 1].to_date)
        ) {
          throw new AManagerCantBeAssignedWithOverlapingTimeFrames(typeName);
        }
      }
    }
  },
};

class AManagerCantBeAssignedWithOverlapingTimeFrames extends GNXError {
  constructor(typeName) {
    super(
      typeName,
      "AManagerCantBeAssignedWithOverlapingTimeFrames",
      "The manager assigned already has a timeframe overlap with another from/to_date entry"
    );
  }
}

const CantDeleteWithChildManagers = {
  validate: async function (typeName, originalObj, materializeObj) {
    const managerFound = await Employees.findOne({ empID: originalObj });
    if (managerFound) {
      throw new CollectionWithChildError(typeName);
    }
  },
};

class CollectionWithChildError extends GNXError {
  constructor(typeName) {
    super(
      typeName,
      "CollectionWithChildError",
      "the collection has one or more childs"
    );
  }
}

module.exports = { ManagerCantHaveOverlapingTimeFrames,CantDeleteWithChildManagers };
