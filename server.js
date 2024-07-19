/* Empty JS object to act as endpoint for all routes */
projectData = {};
// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();
// Dependencies
const bodyParser = require('body-parser')
// Middleware
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
/* Initializing the main project folder */
app.use(express.static('website'));

const port = 3000;
const server = app.listen(port, ()=>{
    console.log("Server is runing")
    console.log(`Server is running on port ${port}`);
});
const data = [];
//////////////////////////////
// GET route (get all data)
app.get('/getData', sendData);

function sendData (request, response) {
  response.send(data);
  console.log(data);
};
//////////////////////////////
// POST route
app.post('/postData', addData);

function addData(req,res){
  const projectData={
    temp:req.body.temp,
    date:req.body.date,
    content:req.body.content,
  };
  data.push(projectData);
  console.log(projectData);
  res.send({message:'POST received'});
}
