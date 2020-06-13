const gnx = require("@simtlix/gnx");
const { Salary } = require("../models/salaries");
const GNXError = gnx.GNXError;

const SalaryCantBeNegative = {
  validate: async function (typeName, originalObj, materializeObj) {
    if (materializeObj.salary <= 0) {
      throw new SalaryCantBeNegativeError(typeName);
    }
  },
};

class SalaryCantBeNegativeError extends GNXError {
  constructor(typeName) {
    super(
      typeName,
      "SalaryCantBeNegativeError",
      "The salary of the employee can't be negative"
    );
  }
}

module.exports = { SalaryCantBeNegative };
