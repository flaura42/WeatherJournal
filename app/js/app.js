
const url = 'http://api.openweathermap.org/data/2.5/weather?zip=98133&units=imperial';
const key = '&APPID=3ed9b799494729eb2627624c05ce8d6d';
// For easy testing
const link = 'http://api.openweathermap.org/data/2.5/weather?zip=98133&units=imperial&APPID=3ed9b799494729eb2627624c05ce8d6d'

async function getWeather() {
  try {
    const response = await getData();
    console.log('response: ', response);
  } catch(e) {
    console.log('error is: ', e);
  }
}

const getData = async(url, key) => {
  const request = await fetch(link);
  if (request.ok) {
    console.log('ok');
  } else {
    console.log(request.status);
  }
  try {
    const response = await request.json();
    return response;
  } catch(error) {
    console.log('error: ', error);
  }
}
