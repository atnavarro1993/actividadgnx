const graphql = require('graphql');
const {GraphQLEnumType}= graphql;

const SexTypeEnum = new GraphQLEnumType({
    name:'SexTypeEnum',
    values:{
        M:{
            value:"male"
        },
        F:{
            value:"female"
        },
        N:{
            value:"non binary"
        },
    }
});

module.exports=SexTypeEnum;