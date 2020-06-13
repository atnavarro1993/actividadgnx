const gnx = require("@simtlix/gnx");
const GNXError = gnx.GNXError;


const { Title } = require("../models/titles");
const CantHavetwoTitlesInSameTimeFrame = {
  validate: async function (typeName, originalObj, materializeObj) {
    const title = await Title.find({ empID: materializeObj.empID });
    if (title.length > 0) {
      for (let i = 0; i < title.length; i++) {
        if (
          (materializeObj.from_date >= title[i].from_date &&
            materializeObj.from_date <= title[i].to_date) ||
          (materializeObj.to_date >= title[i].from_date &&
            materializeObj <= title[i].to_date) ||
          (materializeObj.from_date <= title[0].from_date &&
            materializeObj.to_date >= title[title.length - 1].to_date)
        ) {
          throw new NewEntryOverlapsWithPreviousTimeFramesError(typeName);
        }
      }
    }
  },
};

class NewEntryOverlapsWithPreviousTimeFramesError extends GNXError {
  constructor(typeName) {
    super(
      typeName,
      "NewEntryOverlapsWithPreviousTimeFramesError",
      "the new entry overlaps with other from/to_date entry"
    );
  }
}

module.exports = { CantHavetwoTitlesInSameTimeFrame };
