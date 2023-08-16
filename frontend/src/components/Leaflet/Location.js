import { useEffect, useState } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import { iconUser } from './icon';
import { useDispatch } from 'react-redux';
import { setStart } from '~/redux/mapRoutingMachineSlice';
const Location = () => {
    const map = useMap();
    const dispatch = useDispatch();
    const [position, setPosition] = useState(null);
    useEffect(() => {
        map.locate({
            setView: true,
        });
        map.on('locationfound', (event) => {
            dispatch(setStart([event.latlng.lat, event.latlng.lng]));
            setPosition(event.latlng);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [map]);
    return position ? (
        <Marker position={position} icon={iconUser} interactive={true}>
            <Popup>You are here</Popup>
        </Marker>
    ) : null;
};

export default Location;
