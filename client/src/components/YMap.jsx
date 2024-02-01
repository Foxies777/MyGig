import React from 'react'
import { YMaps, GeolocationControl, Map, ZoomControl } from '@pbe/react-yandex-maps'
const YMap = () => {
    return (
        <YMaps
            enterprise
            query={{
                apikey: 'e31c20db-7d64-488a-8da1-6bd7fa07c6d7',
            }}
        >
            <Map
                style={{ minHeight: '100vh' }}
                defaultState={{
                    center: [54.9044, 52.3154],
                    zoom: 11,
                    controls: [],
                }}
            >
                <GeolocationControl options={{ float: "left" }} />
                <ZoomControl options={{ float: 'right' }} />
            </Map>
        </YMaps>
    )
}

export default YMap