/* Global Variables */
const weatherApiKey = "9af8879b286429a80359b173d1ee5378";
const zip_input_element = document.getElementById("zip");
const submit_button = document.getElementById("generate");
const feelings_input = document.getElementById("feelings");
let dataFromNoderServer;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1)+'.'+ d.getDate()+'.'+ d.getFullYear();


submit_button.addEventListener('click', function startProgram(){
    //Variables
    var temperature;
    var feelings = feelings_input.value;//user input
    const zipCode = zip_input_element.value;//user input
    



    request_weather_from_api(zipCode, weatherApiKey).then((data)=>{
        //set the temperature variable to the value obrained from the api
        temperature = data.main.temp;
        
async function  postANdGet(){
    //after obtainng temperature post it and all of the data (temperature and user input to the node js server) and wait until data is posted
    await postData('http://localhost:3000/postData', {date: newDate,
    temp: temperature,
    feelings: feelings})

    //get the data from node js sevrver 
    getData('http://localhost:3000/getData').then((data)=>{dataFromNoderServer ={...data};udpdateUi()})

}
 postANdGet()
    })
})



//request data from open weather server
const request_weather_from_api = async (zipCode, weatherApiKey)=>{;
    const requestUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${weatherApiKey}&units=metric`;
    const response_promise = await fetch(requestUrl); 
    const response_promise_jsoned = await response_promise.json();
    return response_promise_jsoned
}

//Function to post data from client to node js server
async function postData(url = '', data = {}) {
    await fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
}

//Function to get the posted data from node js server to the client
async function getData(url = ''){
    const response_promise = await fetch(url);
    const response_promise_jsoned = await response_promise.json();
    return response_promise_jsoned;
}

function udpdateUi (){
    document.getElementById('date').innerHTML = "Date : " + dataFromNoderServer.date;
    document.getElementById('temp').innerHTML = "Temperature : " + dataFromNoderServer.temp;
    document.getElementById('content').innerHTML = "Content : " + dataFromNoderServer.feelings;
}