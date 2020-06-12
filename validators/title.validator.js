const gnx = require("@simtlix/gnx");
const GNXError = gnx.GNXError;
const { Title } = require("../models/titles");

const CantHavetwoTitlesInSameTimeFrame = {
  validate: async function (typeName, originalObj, materializeObj) {
    const title = await Title.find({ empID: materializeObj.empID });
    for (let i = 0; i < title.length; i++) {
      console.log(title[i].from_date)
      console.log(title[i].to_date)
      console.log(materializeObj.from_date)
    }
  },
};

module.exports={CantHavetwoTitlesInSameTimeFrame}
