import { GeoSearchControl } from 'leaflet-geosearch';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { iconDefault } from './icon';
import './Leaflet.scss';
const SearchControl = (props) => {
    const map = useMap();
    useEffect(() => {
        const searchControl = new GeoSearchControl({
            provider: props.provider,
            style: 'bar',
            marker: {
                icon: iconDefault,
            },
            ...props,
        });

        map.addControl(searchControl);
        return () => map.removeControl(searchControl);
        // eslint-disable-next-line
    }, [props]);

    return null;
};

export default SearchControl;
