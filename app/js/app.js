
const url = 'http://api.openweathermap.org/data/2.5/weather?zip=98133&units=imperial';
const key = '&APPID=3ed9b799494729eb2627624c05ce8d6d';
// For easy testing
const link = 'http://api.openweathermap.org/data/2.5/weather?zip=98133&units=imperial&APPID=3ed9b799494729eb2627624c05ce8d6d'

const response = {
  "coord": {
    "lon": -122.34,
    "lat": 47.74
  },
  "weather": [
    {
      "id": 803,
      "main": "Clouds",
      "description": "broken clouds",
      "icon": "04n"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 54.61,
    "feels_like": 51.75,
    "temp_min": 53.01,
    "temp_max": 55.99,
    "pressure": 1019,
    "humidity": 81
  },
  "visibility": 16093,
  "wind": {
    "speed": 4.7,
    "deg": 340
  },
  "clouds": {
    "all": 1
  },
  "dt": 1560350645,
  "sys": {
    "type": 1,
    "id": 5122,
    "message": 0.0139,
    "country": "US",
    "sunrise": 1560343627,
    "sunset": 1560396563
  },
  "timezone": -25200,
  "id": 420006353,
  "name": "Seattle",
  "cod": 200
}

function getWeather() {
  const data = {
    date: `Date: ${new Date().toLocaleDateString()}`,
    city: `City: ${response.name}`,
    temp: `Current Temperature: ${Math.round(response.main.temp)}`,
    feel: `Feels Like: ${Math.round(response.main.feels_like)}`,
    desc: `Described as: ${response.weather[0].description}`,
    icon: response.weather[0].icon
  };
  postData(data);
  const section = document.getElementById('weather');
  const checkDiv = document.getElementById('weather-div');
  if (section.contains(checkDiv) ) {
    section.removeChild(checkDiv);
  }
  const div = document.createElement('div');
  div.id = 'weather-div';

  for (let i=0; i<5; i++) {
    const key = Object.keys(data)[i];
    const info = Object.entries(data)[i][1];
    console.log(key, info);
    const p = document.createElement('p');
    p.className = `results-${key}`;
    p.innerHTML = info;
    div.appendChild(p);
  }
  const icon = Object.entries(data)[5][1];
  console.log(icon);
  const img = document.createElement('img');
  img.className = 'results-icon';
  img.src = `http://openweathermap.org/img/wn/${icon}@2x.png`
  div.appendChild(img);
  const button = document.getElementById('weather-button');
  section.insertBefore(div, button);
}

async function myWeather() {
  try {
    const data = await getMyWeather();
    postData(data);
    const section = document.getElementById('my-weather');
    const checkDiv = document.getElementById('my-weather-div');
    if (section.contains(checkDiv) ) {
      section.removeChild(checkDiv);
    }

    const div = document.createElement('div');
    div.id = 'my-weather-div';

    for (let i=0; i<2; i++) {
      const key = Object.keys(data)[i];
      const info = Object.entries(data)[i][1];
      console.log(key, info);
      const p = document.createElement('p');
      p.className = `my-results-${key}`;
      p.innerHTML = info;
      div.appendChild(p);
    }
    const icon = Object.entries(data)[2][1];
    console.log(icon);
    const img = document.createElement('img');
    img.className = 'my-results-icon';
    img.src = `http://openweathermap.org/img/wn/${icon}d@2x.png`
    div.appendChild(img);
    const form = document.querySelector('form');
    section.insertBefore(div, form);
  } catch(e) {
    console.log('Error: ', e);
  }
}

function getMyWeather() {
  const mtemp = document.getElementById('current-temp').value;
  const mfeel = document.getElementById('feels-like').value;
  const mdesc = document.getElementById('description').value;
  const data = {
    mtemp: `Current Temperature: ${mtemp}`,
    mfeels: `Feels Like: ${mfeel}`,
    mdesc: mdesc
  };
  console.log(data);
  return data;
}


// async function getWeather() {
//   try {
//     console.log('trying');
//     const response = await getData();
//     console.log(response);
//     const data = {
//       date: `Date: ${new Date().toLocaleDateString()}`,
//       city: `City: ${response.name}`,
//       temp: `Current Temperature: ${Math.round(response.main.temp)}`,
//       feel: `Feels Like: ${Math.round(response.main.feels_like)}`,
//       desc: `Described as: ${response.weather[0].description}`,
//       icon: response.weather[0].icon
//     };
//     const section = document.getElementById('results');
//     const div = document.createElement('div');
//
//     for (let i=0; i<5; i++) {
//       const key = Object.keys(data)[i];
//       const info = Object.entries(data)[i][1];
//       console.log(key, info);
//       const p = document.createElement('p');
//       p.className = `results-${key}`;
//       p.innerHTML = info;
//       div.appendChild(p);
//     }
//     const icon = Object.entries(data)[5][1];
//     console.log(icon);
//     const img = document.createElement('img');
//     img.className = 'results-icon';
//     img.src = `http://openweathermap.org/img/wn/${icon}@2x.png`
//     div.appendChild(img);
//     section.appendChild(div);
//   } catch(e) {
//     console.log('error is: ', e);
//   }
// }

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

const postData = async(data) => {
  console.log('posting: ', data);
  const response = await fetch('/add', {
    method: 'POST',
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch(error) {
    console.log('error: ', error);
  }
}

// postData('/add', {key: value});
// postData('/add', {key: value, key: value});
