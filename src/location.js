const getLocation = () => {
    const status = document.querySelector(".ubicacionActual");

    const onSuccess = (position) =>{
        
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
        fetch(geoApiUrl)
        .then(res => res.json())
        .then(data => {
            status.textContent = data.city;
        })
    }

    const onError = (error) =>{
        status.textContent = "Sin Ubicacion Actual"
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);

}

