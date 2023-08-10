import { useEffect, useState } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import { iconUser } from './icon';

const Location = () => {
    const map = useMap();
    const [position, setPosition] = useState(null);
    useEffect(() => {
        map.locate({
            setView: true,
        });
        map.on('locationfound', (event) => {
            setPosition(event.latlng);
        });
    }, [map]);
    return position ? (
        <Marker position={position} icon={iconUser} interactive={true}>
            <Popup>You are here</Popup>
        </Marker>
    ) : null;
};

export default Location;
