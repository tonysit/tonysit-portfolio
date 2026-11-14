import * as React from 'react';
import GoogleMapReact from 'google-map-react';

const GoogleMap = ({ height, width, key, zoom, center , options, markers}) => {

    return (
        // Important! Always set the container height explicitly
        <div style={{ height, width, opacity: 0.3 }}>
            <GoogleMapReact
            bootstrapURLKeys={{ key }}
            defaultCenter={center}
            defaultZoom={zoom}
            options={() => options}
            >
            </GoogleMapReact>
        </div>
    );
}

GoogleMap.defaultProps = {
    key: process.env.REACT_APP_GOOGLE_API_KEY,
    zoom: 11,
    center: {
        lat: 0,
        lng: 0
    },
    options: {},
    markers: []
}

export default GoogleMap;