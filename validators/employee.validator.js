const gnx = require("@simtlix/gnx");
const GNXError = gnx.GNXError;
const { Employees } = require("../models/employees");
const { Salary } = require("../models/salaries");

const CantRepeatDni = {
  validate: async function (typeName, originalObj, materializeObj) {
    const EmployeeFound = await Employees.findOne({ dni: materializeObj.dni });
    if (EmployeeFound && EmployeeFound._id != materializeObj.id) {
      throw new CantUpdateEmployeeWithDniAlreadyUsedError(typeName);
    }
  },
};

class CantUpdateEmployeeWithDniAlreadyUsedError extends GNXError {
  constructor(typeName) {
    super(
      typeName,
      "Dni already exists",
      "CantUpdateEmployeeWithDniAlreadyUsedError"
    );
  }
}

const EmployeeMustHaveLegalAge = {
  validate: async function (typeName, originalObj, materializeObj) {
    const currentDate = new Date();
    const birthDate = new Date(materializeObj.birth_date);
    let age = currentDate.getFullYear() - birthDate.getFullYear();
    console.log(age);
    if (currentDate.getMonth() === birthDate.getMonth() && age === 17) {
      age++;
    }
    if (age < 18) {
      throw new EmployeeIsAMinorError(typeName);
    }
  },
};

class EmployeeIsAMinorError extends GNXError {
  constructor(typeName) {
    super(
      typeName,
      "The employee has not the legal age to work",
      "EmployeeIsAMinorError"
    );
  }
}

const CantDeleteEmployeeWithSalary = {
  validate: async function (typeName, originalObj, materializeObj) {
    const SalaryFound = await Salary.findOne({ empID: originalObj });
    if (SalaryFound) {
      throw new CantDeleteEmployeeWithSalaryError(typeName);
    }
  },
};

class CantDeleteEmployeeWithSalaryError extends GNXError {
  constructor(typeName) {
    super(
      typeName,
      "CantDeleteEmployeeWithSalaryError",
      "the employee has one or more salaries registered"
    );
  }
}

module.exports = { CantRepeatDni, EmployeeMustHaveLegalAge,CantDeleteEmployeeWithSalary };
