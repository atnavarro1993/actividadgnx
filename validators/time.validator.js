const gnx = require("@simtlix/gnx");
const GNXError = gnx.GNXError;

const DateValidator = {
    validate: async function (typeName, originalObj, materializeObj){
        if(materializeObj.from_date>=materializeObj.to_date){
            throw new CannotHaveFromDateMoreRecentThanToDateError(typeName);
        }
        
    }
}

class CannotHaveFromDateMoreRecentThanToDateError extends GNXError{
    constructor(typeName){
        super(typeName,"to_date must be more recent than from_date","CannotHaveFromDateMoreRecentThanToDateError")
    }
}




module.exports = {DateValidator};