import { useEffect, useState } from "react";
import Notification from  './Notification';
const APIkey = "d798438582cb4b7eb243adca60f3bc61";

function Map() {
  const [location, setLocation] = useState();
  function getLocationInfo(latitude, longitude) {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude},${longitude}&key=${APIkey}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.status.code === 200) {
          setLocation(data.results[0].formatted);
          
        } else {
          console.log("Reverse geolocation request failed.");
        }
      })
      .catch(error => console.error(error));
  }
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  function success(pos) {
    var crd = pos.coords;
    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);

    getLocationInfo(crd.latitude, crd.longitude);
  }

  function errors(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(result => {
          console.log(result);
          if (result.state === "granted") {
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "prompt") {
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "denied") {
            //
          }
        });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);
  return (
    <div className="Map">
      <Notification message={location}/>
      {location ? <>Your location: {location}</> : null}
    </div>
  );
}
export default Map