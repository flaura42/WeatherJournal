const button = document.getElementById('generate');
button.addEventListener('click', (e) => {
  e.preventDefault();
  // if (event.target.form[0].value)
  const test = event.target.form[0].value;
  if (!test) {
    const conf = confirm('You did not complete the form. Would you like to display saved data?');
    if (conf == true) {
      getData();
    } else {
      return;
    }
  } else {
    collectData(e);
  }
})

const show = document.getElementById('show-form');
show.addEventListener('click', (e) => {
  const holder = document.getElementById('entry-holder');
  holder.classList.add('invisible');

  const form = document.getElementById('form');
  form.reset();
  form.classList.remove('invisible');

  const show = document.getElementById('show-form');
  show.classList.add('invisible');
})

const url = 'http://api.openweathermap.org/data/2.5/weather?units=imperial&zip=';
const key = '&APPID=3ed9b799494729eb2627624c05ce8d6d';


// Data functions
const collectData = async(e) => {
  try {
    const weather = await getWeather(e.target.form[0].value);
    const now = await getNow();
    const time = now[1];
    const icon = e.target.form[2].value;
    const data = {
      date: now[0],
      city: weather.name,
      oTemp: Math.round(weather.main.temp),
      oFeel: Math.round(weather.main.feels_like),
      oIcon: weather.weather[0].icon,
      iTemp: e.target.form[1].value,
      iFeel: e.target.form[3].value,
      iIcon: `${icon}${time}`
    }
    verifyData(data);
  } catch(e) {
    console.log('Error: ', e);
  }
}

const getNow = () => {
  const current = new Date();
  const date = current.toLocaleDateString();
  const hour = current.getHours();
  let time;
  if (hour > 16 || hour < 8) {
    time = 'n';
  } else {
    time = 'd';
  }
  const data = [date, time];
  return data;
}

const getWeather = async(zip) => {
  const req = await fetch(url+zip+key);
  if (!req.ok) {
    console.log(req.status);
  }
  try {
    const res = await req.json();
    return res;
  } catch(e) {
    console.log('error: ', e);
  }
}

const getData = async() => {
  const res = await fetch('/all', {
    method: 'GET',
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  try {
    const data = await res.json();
    verifyData(data);
  } catch(e) {
    console.log('error: ', e);
  }
}

const verifyData = (data) => {
  let check = Object.values(data);
  if (check.length !== 0) {
    let iIcon = Object.getOwnPropertyDescriptor(data, 'iIcon');
    if (iIcon.value.includes(null)) {
      Object.defineProperty(data, 'iIcon', {value: ''});
    }
    let oIcon = Object.getOwnPropertyDescriptor(data, 'oIcon');
    if (oIcon.value.includes(null)) {
      Object.defineProperty(data, 'oIcon', {value: ''});
    }
    postData(data);
    fillPage(data);
  } else {
    alert('Sorry! It appears there is no data stored.  Please complete the form.');
  }
}

const postData = async(data) => {
  const res = await fetch('/add', {
    method: 'POST',
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await res.json();
    return newData;
  } catch(e) {
    console.log('error: ', e);
  }
}

function fillPage(res) {
  const data = {
    date: `Date: ${res.date}`,
    city: `City: ${res.city}`,
    oTemp: `Temperature: ${res.oTemp}`,
    oFeel: `Feels Like: ${res.oFeel}`,
    oIcon: res.oIcon,
    iTemp: `Temperature: ${res.iTemp}`,
    iFeel: `Feels Like: ${res.iFeel}`,
    iIcon: res.iIcon
  };

  // enter locale data
  const section = document.getElementById('entries');
  const lDivCk = document.getElementById('locale-div');
  if (section.contains(lDivCk) ) {
    section.removeChild(lDivCk);
  }

  const lDiv = document.createElement('div');
  lDiv.id = 'locale-div';
  lDiv.className = 'center';
  const p = document.createElement('p');
  p.className = 'locale-p';
  for (let i=0; i<2; i++) {
    const info = Object.entries(data)[i][1];
    const span = document.createElement('span');
    span.className = 'locale-span';
    span.innerHTML = info;
    p.appendChild(span);
  }
  lDiv.appendChild(p);
  h2 = document.querySelector('h2');
  section.children[0].insertAdjacentElement('afterend', lDiv);

  // enter outside data
  const outside = document.getElementById('outside');
  const oDivCk = document.getElementById('outside-div');
  if (outside.contains(oDivCk) ) {
    outside.removeChild(oDivCk);
  }

  const oDiv = document.createElement('div');
  oDiv.id = 'outside-div';
  for (let i=2; i<4; i++) {
    const info = Object.entries(data)[i][1];
    const p = document.createElement('p');
    p.className = 'results-p';
    p.innerHTML = info;
    oDiv.appendChild(p);
  }

  const oIcon = Object.entries(data)[4][1];
  if (oIcon) {
    const oImg = document.createElement('img');
    oImg.className = 'results-icon';
    oImg.src = `http://openweathermap.org/img/wn/${oIcon}@2x.png`
    oDiv.appendChild(oImg);
  }
  outside.appendChild(oDiv);

  // enter inside data
  const inside = document.getElementById('inside');
  const iDivCk = document.getElementById('inside-div');
  if (inside.contains(iDivCk) ) {
    inside.removeChild(iDivCk);
  }

  const iDiv = document.createElement('div');
  iDiv.id = 'inside-div';
  for (let i=5; i<7; i++) {
    const info = Object.entries(data)[i][1];
    const p = document.createElement('p');
    p.className = `results-p`;
    p.innerHTML = info;
    iDiv.appendChild(p);
  }

  const iIcon = Object.entries(data)[7][1];
  if (iIcon) {
    const iImg = document.createElement('img');
    iImg.className = 'results-icon';
    iImg.src = `http://openweathermap.org/img/wn/${iIcon}@2x.png`
    iDiv.appendChild(iImg);
  }
  inside.appendChild(iDiv);

  const holder = document.getElementById('entry-holder');
  holder.classList.remove('invisible');

  const form = document.getElementById('form');
  form.reset();
  form.classList.add('invisible');

  const show = document.getElementById('show-form');
  show.classList.remove('invisible');
}
