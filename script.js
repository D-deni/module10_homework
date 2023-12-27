let input = document.getElementById('input')
let checkStatus = document.getElementById('status')
let reload = document.getElementById('reload')
let output = document.getElementById('output')
const wsUri = 'wss://echo-ws-service.herokuapp.com'
let ws = new WebSocket(wsUri)
let latitude;
let longitude;
let sLink = document.getElementById('location');
ws.onopen = ()=>{
    checkStatus.innerHTML = 'CONNECTED'
}

ws.onclose = () => {
    checkStatus.innerHTML = 'DISCONNECTED'
    reload.classList.remove('hidden')
}
ws.onmessage = (res) =>{
    writeToScreen('Server: ' + res.data)
    console.log(res.data);
}

function writeToScreen(message) {
    let pre = document.createElement('p')
    pre.innerHTML = message
    output.appendChild(pre)
}
reload.addEventListener('click', ()=>{
    ws = new WebSocket(wsUri)
    ws.onopen = () =>{
        checkStatus.innerHTML = 'CONNECTED'
        reload.classList.add('hidden')
    }
})

document.getElementById('btn').addEventListener('click', () => {
    const message = input.value
    writeToScreen("User: " + message)
    ws.send(message)
    input.value = ''
   
})

function geoFindMe() {
    function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      sLink.setAttribute ('href', `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`)
      ws.send(sLink)
      sLink.textContent = `Локация`;
    }
    function error() {
      status.textContent = "Невозможно получить ваше местоположение";
    }
  
    if (!navigator.geolocation) {
      status.textContent = "Geolocation не поддерживается вашим браузером";
    } else {
      status.textContent = "Определение местоположения…";
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }
  
  document.getElementById("btnLocation").addEventListener("click", geoFindMe);