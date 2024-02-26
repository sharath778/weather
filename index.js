// $("#back").hide();
// $(".fa-location-dot").click(()=>{
//     $("#back").show();
// });
// $("#enter-btn").click(()=>{
//     $("#back").show();
// });

var temp=$(".tempVal");
var hum=$(".humVal");
var prec=$(".precVal");
var feel=$(".feelVal");
var low=$(".lowVal");
var high=$(".highVal");
var place=$("#placeVal");

function getValue(){
    
   return new Promise((resolve, reject)=>{
        let value;
        $("#enter-btn").click(()=>{
            value=$("#searchTxt").val();
            resolve(value);
        });
        
    });
    
}

async function details(city){
    // var city=await getValue();
    var rawData= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f34fc5789fd047d4b92cb0cda9d1aee4`);
    var data=await rawData.json();
    console.log(typeof(data.cod));
    if(data.cod==200){
        $("#errorCard").hide();
        $("#card").show();
        place.text(city.toUpperCase());
        temp.text((data.main.temp-273.15).toFixed(2));
        hum.text(data.main.humidity);
        prec.text((data.main.pressure/1000).toFixed(0)+" atp");
        feel.text((data.main.feels_like).toFixed(2));
        low.text((data.main.temp_min-273.15).toFixed(2)+" /");
        high.text((data.main.temp_max-273.15).toFixed(2));
    }else{
        $("#errorCard").show();
        $("#card").hide();
    }
    
}
function geo(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }else{
        alert("Your browser not supports the location!")
    }
}
function showPosition(position){
    let lat=position.coords.latitude;
    let long=position.coords.longitude;
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${long}`)
    .then((res)=>res.json())
    .then((data)=>{
        details(data.address.city);
    }).catch((rej)=>{
        console.error(rej);
    });
    
}

$("#errorCard").hide();
$(".fa-location-dot").click(()=>{
    geo();
});
$("#enter-btn").click(async ()=>{
    details(await getValue());
});





