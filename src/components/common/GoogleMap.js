import * as React from 'react';
import GoogleMapReact from 'google-map-react';

const GoogleMap = ({ height, width, apiKey, zoom, center, options }) => {
    const mapUrl = `https://www.google.com/maps?q=${center.lat},${center.lng}`;

    return (
        // Important! Always set the container height explicitly
        <div
            className={apiKey ? undefined : 'google-map-fallback'}
            style={{ height, width, opacity: apiKey ? 0.3 : 1 }}
        >
            {apiKey ? (
                <GoogleMapReact
                    bootstrapURLKeys={{ key: apiKey }}
                    defaultCenter={center}
                    defaultZoom={zoom}
                    options={() => options}
                />
            ) : (
                <a href={mapUrl} target="_blank" rel="noopener noreferrer">
                    Open this location in Google Maps
                </a>
            )}
        </div>
    );
}

GoogleMap.defaultProps = {
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    zoom: 11,
    center: {
        lat: 0,
        lng: 0
    },
    options: {},
    markers: []
}

export default GoogleMap;
