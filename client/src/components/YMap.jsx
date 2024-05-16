import React, { useState } from 'react';
import { YMaps, GeolocationControl, Map, ZoomControl, Placemark } from '@pbe/react-yandex-maps';

const YMap = () => {
    const [streetData, setStreetData] = useState(null);
    const [street, setStreet] = useState(null);
    const handleMapClick = async (e) => {
        const coords = e.get('coords');

        const url = `https://api.opencagedata.com/geocode/v1/json?q=${coords[0]},${coords[1]}&key=d798438582cb4b7eb243adca60f3bc61`;
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                if (data.status.code === 200 && data.results.length > 0) {
                    const currentLocation = data.results[0].formatted;
                    const street = currentLocation.split(',')[0].trim().replace(/Улица\s+/i, '');
                    
                    setStreet(street);

                } else {
                    console.log("Reverse geolocation request failed.");
                }
            })
        
        setStreetData(data);
    };
    console.log(street);
    return (
        <YMaps
            enterprise
            query={{ apikey: 'e31c20db-7d64-488a-8da1-6bd7fa07c6d7' }}
        >
            <Map
                style={{ minHeight: '100vh' }}
                defaultState={{
                    center: [54.9044, 52.3154],
                    zoom: 11,
                    controls: [],
                }}
                onClick={handleMapClick}
            >
                <GeolocationControl options={{ float: "left" }} />
                <ZoomControl options={{ float: 'right' }} />
                {streetData && (
                    <Placemark
                        geometry={[streetData.lat, streetData.lon]}
                        properties={{
                            balloonContent: streetData.info,
                        }}
                        options={{
                            preset: 'islands#icon',
                            iconColor: '#0095b6',
                        }}
                    />
                )}
            </Map>
        </YMaps>
    );
};

export default YMap;
