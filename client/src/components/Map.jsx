import React, { useEffect, useState, useCallback, useContext } from "react";
import { jwtDecode } from 'jwt-decode';
import { createNotification } from '../http/notificationAPI';
import { fetchStreet } from "../http/streetAPI";
import { Context } from "../main";


const APIkey = "d798438582cb4b7eb243adca60f3bc61";

function Map() {
  const [location, setLocation] = useState();
  const [lastStreet, setLastStreet] = useState('');

  const { streets } = useContext(Context)

  useEffect(() => {
    fetchStreet().then(data => streets.setStreets(data))
  }, [])

  const sendNotification = useCallback(async (streetName) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Нет токена аутентификации');
      return;
    }

    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;
    const cleanStreetName = streetName.split(',')[0].trim();
    console.log(streetName);
    console.log(cleanStreetName.split(' ')[1]);
    try {
      const matchingStreet = streets.streets.find(street => street.street_name === cleanStreetName.split(' ')[1]);
      if (!matchingStreet) {
        console.error('Улица не найдена');
        return;
      }
      const streetId = matchingStreet.id;

      await createNotification(userId, streetId);
    } catch (error) {
      console.error('Ошибка при отправке уведомления:', error);
    }
  }, []);


  const getLocationInfo = useCallback((latitude, longitude) => {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude},${longitude}&key=${APIkey}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.status.code === 200 && data.results.length > 0) {
          const currentLocation = data.results[0].formatted;
          if (currentLocation !== lastStreet) {
            setLastStreet(currentLocation);
            setLocation(currentLocation);
            sendNotification(currentLocation);
          }
        } else {
          console.log("Reverse geolocation request failed.");
        }
      })
      .catch((error) => console.error(error));
  }, [lastStreet, sendNotification]);


  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function success(pos) {
    const crd = pos.coords;
    getLocationInfo(crd.latitude, crd.longitude);
  }

  function errors(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  useEffect(() => {
    let intervalId;
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then((result) => {
          if (result.state === "granted" || result.state === "prompt") {
            navigator.geolocation.getCurrentPosition(success, errors, options);
            intervalId = setInterval(() => {
              navigator.geolocation.getCurrentPosition(success, errors, options);
            }, 300000);
          }
        });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [getLocationInfo]);

  return (
    <div className="Map">
      {location ? <>Your location: {location}</> : null}
    </div>
  );
}

export default Map;