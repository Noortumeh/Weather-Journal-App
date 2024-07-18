// Personal API Key for OpenWeatherMap API
const apiKey ='962229b4b6fab0d2c0a4cde8e50b8042';
const nowDate = new Date();
// Base URL for OpenWeatherMap API
const baseURL ='https://api.openweathermap.org/data/2.5/weather?q=';
// handle form
const zipCode = document.getElementById('zip');
const feeling = document.getElementById('feelings');
const date = document.getElementById('date');
const temp = document.getElementById('temp');
const content = document.getElementById('content');
// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);
/* Function called by event listener */
function performAction() {
  getInformation(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode.value},&appid=${apiKey}&units=imperial`)
  .then(function(data){
    //Post requsete to save data in the server
    postData('/postData', {date: nowDate, temp: data.main.temp, content: feeling.value});
    updateUI()
  })
  .then(
    // updateUI()
  )
}
/* Function to GET Web API Data*/
const getInformation = async (url)=>{
  const res = await fetch(url)
  try{
    const data = await res.json();
    return data;
  }catch(err){
    console.log("get error",err);
  }
};
/* Function to POST data */
const postData = async (url='', data={})=>{
  const res = await fetch(url, {
    method: 'POST',
    credentials:'same-origin',
    headers:{
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  try{
    const newData = await res.json();
    console.log(newData);
    return newData;
  }catch(err){
    console.log("post error",err);
  }
};
/* Function to GET Project Data */
const updateUI = async () => {
  const request = await fetch('/getData');
  try{
    const allData = await request.json();
    console.log(allData);
    date.innerHTML = allData[allData.length-1].date;
    temp.innerHTML = allData[allData.length-1].temp;
    content.innerHTML = allData[allData.length-1].content;
  }catch(err){
    console.log("get error",err);
  }
};