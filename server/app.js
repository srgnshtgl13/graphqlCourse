const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const schema = require('./schema/schema');
const app = express();

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema
}));

app.listen(4000, () => {
    console.log('Listen Express on 127.0.0.1:4000 also see 127.0.0.1:4000/graphql');
});