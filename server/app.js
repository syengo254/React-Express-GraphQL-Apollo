const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3001;

mongoose.connect(`mongodb://localhost/gql-ninja`);
mongoose.connection.once('open', () => {
    console.log(`Connected to db at ${mongoose.connection.host}`);
});

app.use(cors());

app.use(
    '/graphql',
    graphqlHTTP({
        schema,
        //graphiql: true,
    })
);


app.listen(PORT, () => console.log(`Server is listening on port ${PORT}, http://localhost:${PORT} \nand the graphUI at http://localhost:${PORT}/graphql`))