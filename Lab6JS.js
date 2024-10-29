function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    // .toFixed() returns string, so ' * 1' is a trick to convert to number
}

async function getMapData(latitude, longitude) {
    const mapData = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
        .then((res) => res.json());
    //.then((resJson) => {
    //  console.log(resJson);
    //})
    return mapData;
}



async function createMap() {
    var map = L.map('map').setView([30, -90], 3);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

   // const mapData = await getMapData();
    //console.log(mapData);

    for(i=1;i<=3;i++){
        const latitude = getRandomInRange(30, 35, 3);
        const longitude = getRandomInRange(-90, -100, 3);
        var marker = L.marker([latitude, longitude]).addTo(map);
        const mapData = await getMapData(latitude, longitude);
        console.log(mapData);

        const city = mapData.city;
        console.log(city);

        var locationText = document.getElementById("location"+i);
        var coordinateText = document.getElementById("coordinate"+i);
        
        locationText.innerHTML= 'Locality: ' + city;
        console.log(locationText.innerHTML);
        coordinateText.innerHTML = 'Marker' + i + ': Latitude: ' + latitude + ", Longitude:" + longitude;
    }

}

window.onload = createMap;