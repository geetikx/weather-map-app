/*const btn=document.getElementById("btn_add");
btn.addEventListener("click", addNumbers);

function addNumbers()
{
    const n1 = document.getElementById("n1").value;
    const n2 = document.getElementById("n2").value;
    const sum= +n1 + +n2;
    const resultDiv=document.getElementById("result");
    resultDiv.innerHTML=sum;
}    


*/
function getLocation()
{
    if(navigator.geolocation)
        navigator.geolocation.getCurrentPosition(async position=>{
            const lat=position.coords.latitude;
            const long=position.coords.longitude;
            console.log("lat:"+lat+"long:"+long)

            const data=await getWeatherData(lat,long);
            renderWeatherData(data);


            var map = L.map('map').setView([20.9716, 80.5946], 5);

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);
            
            let marker=L.marker([lat,long]).addTo(map);
            marker.bindPopup(data.name).openPopup();
    
            map.on('click',async function(e) {
                console.log("Lat: "+e.latlng.lat+"long: "+e.latlng.lng);
    
                const data=await getWeatherData(lat,long);
                renderWeatherData(data);
            })
         })
/*
        const myCallback=()=>{
            console.log("I am sleeping");
        }
        setTimeout(myCallback,5000);*/

       
}
getLocation();



async function getWeatherData(lat,long){
    const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=ddfaba4398b491fa4ef3e29a5e934c6e`;
 
            let response = await fetch(api);
            const data = await response.json();
 
            console.log(data);
    
    return data;
}

function renderWeatherData(data){
    document.getElementById("cityname").innerHTML=data.name;
    document.getElementById("temperature").innerHTML=data.main.temp;
    document.getElementById("mintemperature").innerHTML=data.main.temp_min;
    document.getElementById("maxtemperature").innerHTML=data.main.temp_max;
    document.getElementById("humidity").innerHTML=data.main.humidity;
    document.getElementById("pressure").innerHTML=data.main.pressure;

}


