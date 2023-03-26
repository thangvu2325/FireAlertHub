import { Marker, MapContainer, TileLayer, useMap, useMapEvents, Popup } from 'react-leaflet';
import { useEffect, useState } from 'react';
import './Leaflet.scss';
import 'leaflet/dist/leaflet.css';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet-geosearch/dist/geosearch.css';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

function Leaflet({ locate, ...props }) {
    const [initialPosition, setInitialPosition] = useState([]);
    const [position, setPosition] = useState([10.787836, 106.60486]);
    const [selectedResult, setSelectedResult] = useState(null);
    const [map, setMap] = useState(null);
    const zoom = 17;

    const iconDefault = new L.Icon({
        iconUrl: icon,
        shadowUrl: iconShadow,
        iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
        shadowAnchor: [12, 41], // the same for the shadow
        popupAnchor: [0, -41], // point from which the popup should open relative to the iconAnchor
    });
    const sendData = (string) => {
        props.parentCallback(string);
    };
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setInitialPosition([latitude, longitude]);
        });
    }, []);

    const provider = new OpenStreetMapProvider();

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
    const Markers = () => {
        useMapEvents({
            click(e) {
                setPosition([e.latlng.lat, e.latlng.lng]);
                sendData(`${e.latlng.lat}, ${e.latlng.lng}`);
            },
        });

        return position ? (
            <Marker
                key={position[0]}
                position={position}
                interactive={false}
                icon={iconDefault}
                onclick={() => setSelectedResult(null)}
            >
                {selectedResult && (
                    <Popup position={[selectedResult.y, selectedResult.x]}>{selectedResult.label}</Popup>
                )}
            </Marker>
        ) : null;
    };

    return (
        <>
            {console.log(position, initialPosition)}
            <MapContainer center={position || initialPosition} zoom={zoom}>
                <Markers />

                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <SearchControl
                    provider={provider}
                    showMarker={true}
                    showPopup={false}
                    style={iconDefault}
                    popupFormat={({ result }) => result.label}
                    maxMarkers={3}
                    retainZoomLevel={false}
                    animateZoom={true}
                    autoClose={false}
                    searchLabel={'nhập địa chỉ ở đây!'}
                    keepResult={false}
                />
            </MapContainer>
        </>
    );
}

export default Leaflet;
