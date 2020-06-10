const gnx = require('@simtlix/gnx');
const Employees = require('../models/employees').Employees;
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID, GraphQLString,GraphQLInt } = graphql;

const EmployeesType = new GraphQLObjectType({
    name:'employeeType',
    description:'represents employees',
    fields:()=>({
        id:{type:GraphQLID},
        birth_date:{type:GraphQLInt},
        first_name:{type:GraphQLString},
        last_name:{type:GraphQLString},
        hire_date:{type:GraphQLInt},
        gender:{type:GraphQLString}
    })
})