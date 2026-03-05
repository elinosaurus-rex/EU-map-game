const euData = {
"France":1957,
"Germany":1957,
"Italy":1957,
"Belgium":1957,
"Netherlands":1957,
"Luxembourg":1957,
"Denmark":1973,
"Ireland":1973,
"Greece":1981,
"Spain":1986,
"Portugal":1986,
"Austria":1995,
"Finland":1995,
"Sweden":1995,
"Poland":2004,
"Hungary":2004,
"Czech Republic":2004,
"Slovakia":2004,
"Slovenia":2004,
"Estonia":2004,
"Latvia":2004,
"Lithuania":2004,
"Cyprus":2004,
"Malta":2004,
"Bulgaria":2007,
"Romania":2007,
"Croatia":2013,
"United Kingdom":1973
};
const euFacts = {

"France":"Founding member of the European Communities.",
"Germany":"Founding member of the European Communities.",
"Italy":"Founding member of the European Communities.",
"Belgium":"Founding member and host of many EU institutions.",
"Netherlands":"Founding member and strong supporter of EU integration.",
"Luxembourg":"One of the smallest but most influential founding members.",

"Denmark":"Joined during the first enlargement in 1973.",
"Ireland":"Joined with Denmark and the UK in 1973.",

"Greece":"First Mediterranean enlargement in 1981.",

"Spain":"Joined after its transition from dictatorship to democracy.",
"Portugal":"Joined after the Carnation Revolution ended dictatorship.",

"Austria":"Neutral country joining after the Cold War.",
"Finland":"Nordic country joining the EU in 1995.",
"Sweden":"Joined together with Austria and Finland in 1995.",

"Poland":"Part of the largest EU enlargement, bringing many post-communist states.",
"Hungary":"Part of the historic 2004 enlargement.",
"Czech Republic":"Joined after the post-communist transition.",
"Slovakia":"Joined during the 2004 'big bang' enlargement.",
"Slovenia":"First former Yugoslav republic to join the EU.",
"Estonia":"Baltic state joining in 2004.",
"Latvia":"Baltic state joining in 2004.",
"Lithuania":"Baltic state joining in 2004.",
"Cyprus":"Joined the EU despite the island’s political division.",
"Malta":"Smallest EU country joining in 2004.",

"Bulgaria":"Joined during the 2007 enlargement.",
"Romania":"Joined together with Bulgaria in 2007.",

"Croatia":"First Western Balkan country to join the EU in 2013.",
"United Kingdom":"Joined the European Communities in 1973 and left the EU in 2020 after Brexit."

};

let discoveredCountries = [];

function getColor(year){
if(year==1957) return "#0B3D91";
if(year==1973) return "green";
if(year==1981) return "yellow";
if(year==1986) return "orange";
if(year==1995) return "purple";
if(year==2004) return "red";
if(year==2007) return "pink";
if(year==2013) return "brown";
return "gray";

}

var map = L.map('map').setView([54,15],4);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
attribution:'Map data © OpenStreetMap'
}).addTo(map);

var geoLayer;

fetch("europe.geojson")
.then(res => res.json())
.then(data => {

geoLayer = L.geoJSON(data,{
style:{
color:"black",
weight:1,
fillColor:"gray",
fillOpacity:0.5
}
}).addTo(map);

});

function checkAnswer(){

let country=document.getElementById("countryInput").value;
let year=parseInt(document.getElementById("yearInput").value);

if(!(country in euData)){
alert("Not an EU country");
return;
}

if(euData[country]!=year){

let hint = confirm("Wrong year. Do you want a hint?");

if(hint){
alert(country + " joined the EU in " + euData[country]);
}

return;
}

geoLayer.eachLayer(function(layer){

if(layer.feature.properties.NAME===country){


layer.setStyle({
fillColor:getColor(year),
fillOpacity:0.9
});

}
if(!discoveredCountries.includes(country)){
discoveredCountries.push(country);
updateTimeline();
}
});

}
function updateTimeline(){

let container = document.getElementById("timeline");

container.innerHTML="";

discoveredCountries.sort(function(a,b){
return euData[a] - euData[b];
});

discoveredCountries.forEach(country => {

let entry=document.createElement("div");

entry.className="timeline-entry";

let year=euData[country];

let flag = getFlagEmoji(country);

entry.innerHTML=
flag + " " + country + " — " + year + "<br>" +
"<small>" + euFacts[country] + "</small>";

container.appendChild(entry);

});
}
function revealAll(){

for (let country in euData){

geoLayer.eachLayer(function(layer){

if(layer.feature.properties.NAME===country){

layer.setStyle({
fillColor:getColor(euData[country]),
fillOpacity:0.9
});

}

});

if(!discoveredCountries.includes(country)){
discoveredCountries.push(country);
}

}

updateTimeline();

}

function getFlagEmoji(country){

const flags={
"France":"🇫🇷",
"Germany":"🇩🇪",
"Italy":"🇮🇹",
"Belgium":"🇧🇪",
"Netherlands":"🇳🇱",
"Luxembourg":"🇱🇺",
"Denmark":"🇩🇰",
"Ireland":"🇮🇪",
"Greece":"🇬🇷",
"Spain":"🇪🇸",
"Portugal":"🇵🇹",
"Austria":"🇦🇹",
"Finland":"🇫🇮",
"Sweden":"🇸🇪",
"Poland":"🇵🇱",
"Hungary":"🇭🇺",
"Czech Republic":"🇨🇿",
"Slovakia":"🇸🇰",
"Slovenia":"🇸🇮",
"Estonia":"🇪🇪",
"Latvia":"🇱🇻",
"Lithuania":"🇱🇹",
"Cyprus":"🇨🇾",
"Malta":"🇲🇹",
"Bulgaria":"🇧🇬",
"Romania":"🇷🇴",
"Croatia":"🇭🇷",
"United Kingdom":"🇬🇧"
};

return flags[country] || "";

}
