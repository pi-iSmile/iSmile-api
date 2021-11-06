import express from 'express';

const app = express();

app.get('/', (request, response) => response.json({ hello: 'World' }));

app.listen(process.env.PORT || 8080, function() {
    console.log("Express server listening!!")
});
