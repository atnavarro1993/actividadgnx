const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const gnx = require('@simtlix/gnx');
const app = express();


mongoose.connect('mongodb://localhost:27017,localhost:27018,localhost:27019/example', { replicaSet: 'rs' });
mongoose.connection.once('open',()=>{
    console.log('connected to database');
});


const types = require('./types');
const includedTypes = Object.values(types);
const schema = gnx.createSchema(includedTypes,includedTypes);


app.use('/graphql',graphqlHTTP({
    schema,
    graphiql: true,
}))

app.listen(3000,()=>{
    console.log('listening on port 30000')
})