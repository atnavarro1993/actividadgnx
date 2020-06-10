const gnx = require('@simtlix/gnx');
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt } = graphql;

const Title = require('../models/titles').Title;
const Employees = require("../models/employees").Employees;
const employeeType = require('./epmloyees');

const titlesType = new GraphQLObjectType({
    name:"titleType",
    description:"represents titles",
    fields:()=>({
        id:{type:GraphQLID},
        employee:{
            type:employeeType,
            extensions:{
                relation:{
                    connectionField:"empID",
                    embedded: false
                }
            },
            resolve(parent,args){
                return Employees.findById(parent.empID)
            }
        },
        title:{type:GraphQLString},
        from_date:{type:GraphQLString},
        to_date:{type:GraphQLString}
    })
})

gnx.connect(Title,titlesType,'Title','Titles');

module.exports=titlesType;