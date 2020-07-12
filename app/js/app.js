const url = 'http://api.openweathermap.org/data/2.5/weather?units=imperial&zip=';
const key = '&APPID=3ed9b799494729eb2627624c05ce8d6d';

async function getOutside() {
  try {
    const zipcode = await document.getElementById('zipcode').value
    const response = await getWeather(zipcode);
    const data = {
      zipcode: zipcode,
      date: `Date: ${new Date().toLocaleDateString()}`,
      city: `City: ${response.name}`,
      temp: `Temperature: ${Math.round(response.main.temp)}`,
      feel: `Feels Like: ${Math.round(response.main.feels_like)}`,
      icon: response.weather[0].icon
    };
    console.log('data: ', data);
    postData(data);

    const locale = document.getElementById('weather');
    const lDiv = document.createElement('div');
    lDiv.id = 'locale-div';
    lDiv.className = 'flex center';

    const p = document.createElement('p');
    p.className = 'locale-p';
    for (let i=1; i<3; i++) {
      const key = Object.keys(data)[i];
      const info = Object.entries(data)[i][1];
      console.log(key, info);

      const span = document.createElement('span');
      span.className = 'locale-span';
      span.innerHTML = info;
      p.appendChild(span);
    }
    lDiv.appendChild(p);
    h2 = document.querySelector('h2');
    locale.children[0].insertAdjacentElement('afterend', lDiv);

    const outside = document.getElementById('outside');
    const odivck = document.getElementById('outside-div');
    if (outside.contains(odivck) ) {
      outside.removeChild(odivck);
    }

    const oDiv = document.createElement('div');
    oDiv.id = 'outside-div';
    for (let i=3; i<5; i++) {
      const key = Object.keys(data)[i];
      const info = Object.entries(data)[i][1];
      console.log(key, info);
      const p = document.createElement('p');
      p.className = 'results-p';
      p.innerHTML = info;
      oDiv.appendChild(p);
    }
    const icon = Object.entries(data)[5][1];
    console.log(icon);
    const img = document.createElement('img');
    img.className = 'results-icon';
    img.src = `http://openweathermap.org/img/wn/${icon}@2x.png`
    oDiv.appendChild(img);
    outside.appendChild(oDiv);

    const oForm = document.getElementById('outside-form');
    oForm.reset();
  } catch(e) {
    console.log('error is: ', e);
  }
}

async function insideWeather() {
  try {
    const data = await getMyWeather();
    postData(data);
    const inside = document.getElementById('inside');
    const idivck = document.getElementById('inside-div');
    if (inside.contains(idivck) ) {
      inside.removeChild(idivck);
    }

    const iDiv = document.createElement('div');
    iDiv.id = 'inside-div';

    for (let i=0; i<2; i++) {
      const key = Object.keys(data)[i];
      const info = Object.entries(data)[i][1];
      console.log(key, info);
      const p = document.createElement('p');
      p.className = `results-${key}`;
      p.innerHTML = info;
      iDiv.appendChild(p);
    }
    const icon = Object.entries(data)[2][1];
    console.log(icon);
    const img = document.createElement('img');
    img.className = 'results-icon';
    img.src = `http://openweathermap.org/img/wn/${icon}d@2x.png`
    iDiv.appendChild(img);
    const form = document.getElementById('inside-form');
    form.reset();
    inside.appendChild(iDiv);
  } catch(e) {
    console.log('Error: ', e);
  }
}

function getMyWeather() {
  const mtemp = document.getElementById('current-temp').value;
  const mdesc = document.getElementById('description').value;
  const mfeel = document.getElementById('feels-like').value;
  const data = {
    mtemp: `Temperature: ${mtemp}`,
    mfeels: `Feels Like: ${mfeel}`,
    mdesc: mdesc
  };
  console.log(data);
  return data;
}

const getWeather = async(zipcode) => {
  console.log(url+zipcode+key)
  const request = await fetch(url+zipcode+key);
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

// For easy testing
// const link = 'http://api.openweathermap.org/data/2.5/weather?zip=98133&units=imperial&APPID=3ed9b799494729eb2627624c05ce8d6d'

// const response = {
//   "coord": {
//     "lon": -122.34,
//     "lat": 47.74
//   },
//   "weather": [
//     {
//       "id": 803,
//       "main": "Clouds",
//       "description": "broken clouds",
//       "icon": "04n"
//     }
//   ],
//   "base": "stations",
//   "main": {
//     "temp": 54.61,
//     "feels_like": 51.75,
//     "temp_min": 53.01,
//     "temp_max": 55.99,
//     "pressure": 1019,
//     "humidity": 81
//   },
//   "visibility": 16093,
//   "wind": {
//     "speed": 4.7,
//     "deg": 340
//   },
//   "clouds": {
//     "all": 1
//   },
//   "dt": 1560350645,
//   "sys": {
//     "type": 1,
//     "id": 5122,
//     "message": 0.0139,
//     "country": "US",
//     "sunrise": 1560343627,
//     "sunset": 1560396563
//   },
//   "timezone": -25200,
//   "id": 420006353,
//   "name": "Seattle",
//   "cod": 200
// }
//
// function getOutside() {
//   // const zipcode = document.getElementById('zipcode').value
//   const data = {
//     zipcode: '98133',
//     date: `Date: ${new Date().toLocaleDateString()}`,
//     city: `City: ${response.name}`,
//     temp: `Temperature: ${Math.round(response.main.temp)}`,
//     feel: `Feels Like: ${Math.round(response.main.feels_like)}`,
//     icon: response.weather[0].icon
//   };
//   console.log('data: ', data);
//   postData(data);
//
//   const locale = document.getElementById('weather');
//   const lDiv = document.createElement('div');
//   lDiv.id = 'locale-div';
//   lDiv.className = 'flex center';
//
//   const p = document.createElement('p');
//   p.className = 'locale-p';
//   for (let i=1; i<3; i++) {
//     const key = Object.keys(data)[i];
//     const info = Object.entries(data)[i][1];
//     console.log(key, info);
//
//     const span = document.createElement('span');
//     span.className = 'locale-span';
//     span.innerHTML = info;
//     p.appendChild(span);
//   }
//   lDiv.appendChild(p);
//   h2 = document.querySelector('h2');
//   locale.children[0].insertAdjacentElement('afterend', lDiv);
//
//   const outside = document.getElementById('outside');
//   const odivck = document.getElementById('outside-div');
//   if (outside.contains(odivck) ) {
//     outside.removeChild(odivck);
//   }
//
//   const oDiv = document.createElement('div');
//   oDiv.id = 'outside-div';
//   for (let i=3; i<5; i++) {
//     const key = Object.keys(data)[i];
//     const info = Object.entries(data)[i][1];
//     console.log(key, info);
//     const p = document.createElement('p');
//     p.className = 'results-p';
//     p.innerHTML = info;
//     oDiv.appendChild(p);
//   }
//   const icon = Object.entries(data)[5][1];
//   console.log(icon);
//   const img = document.createElement('img');
//   img.className = 'results-icon';
//   img.src = `http://openweathermap.org/img/wn/${icon}@2x.png`
//   oDiv.appendChild(img);
//   outside.appendChild(oDiv);
//
//   const oForm = document.getElementById('outside-form');
//   oForm.reset();
// }


// postData('/add', {key: value});
// postData('/add', {key: value, key: value});
