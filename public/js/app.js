console.log("client side js");
const config = 'http://localhost:3000'

// weather?address=uri';

const getData = async(location)=>{
  const url  = `${config}/weather?address=${location}`;
  const res = await fetch(url);
  const {location : address , temperature , feelslike}= await res.json();
  
 

  const content = document.getElementById('weather-content');

  if(!address || !temperature || !feelslike)
  {
    content.innerHTML = 'Unable to load data , please try again a few moment later!';
    return;
  }
  content.innerHTML = `
    <p>Temperature : ${temperature}</p>
    <p>Feels Like : ${feelslike}</p>
    <p>Location : ${address}</p>
  `;


};



const form = document.getElementById('form');
const search = document.getElementById('search');
const reset = document.getElementById('reset');



form.addEventListener('submit',(event)=>{
  event.preventDefault();
  const location = search.value.trim() ;
  getData(location);
  
});

reset.addEventListener('click',()=>{
  const content = document.getElementById('weather-content');
  content.innerHTML = '';
});


