
const url = 'http://api.openweathermap.org/data/2.5/weather?zip=98133&units=imperial';
const key = '&APPID=3ed9b799494729eb2627624c05ce8d6d';
// For easy testing
const link = 'http://api.openweathermap.org/data/2.5/weather?zip=98133&units=imperial&APPID=3ed9b799494729eb2627624c05ce8d6d'

async function getWeather() {
  try {
    console.log('trying');
    const response = await getData();
    console.log(response);
    const data = {
      city: `City: ${response.name}`,
      temp: `Current Temperature: ${Math.round(response.main.temp)}`,
      feel: `Feels Like: ${Math.round(response.main.feels_like)}`,
      desc: `Described as: ${response.weather[0].description}`,
      icon: response.weather[0].icon
    };
    const section = document.getElementById('results');
    const div = document.createElement('div');

    for (let i=0; i<4; i++) {
      const key = Object.keys(data)[i];
      const info = Object.entries(data)[i][1];
      console.log(key, info);
      const p = document.createElement('p');
      p.className = `results-${key}`;
      p.innerHTML = info;
      div.appendChild(p);
    }
    const icon = Object.entries(data)[4][1];
    console.log(icon);
    const img = document.createElement('img');
    img.className = 'results-icon';
    img.src = `http://openweathermap.org/img/wn/${icon}@2x.png`
    div.appendChild(img);
    section.appendChild(div);
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
