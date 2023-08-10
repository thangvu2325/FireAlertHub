import { Marker, MapContainer, TileLayer, useMapEvents, Popup } from 'react-leaflet';
import { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet-geosearch/dist/geosearch.css';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-fullscreen/dist/Leaflet.fullscreen.js';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';
// import { IconSquareX } from '@tabler/icons-react';
import './Leaflet.scss';
import { iconDefault } from './icon';
import SearchControl from './SearchControl';
import { FireStationMarkers, UserMarkers } from './Markers';
import Location from './Location';
import { useEffect } from 'react';
import { getLocationofAllUser } from '~/api/managerRequest';
import { IconSquareX } from '@tabler/icons-react';

// const userList = [
//     {
//         location: {
//             lat: 10.786771317571421,
//             lng: 106.61557674407959,
//         },
//         email: 'thangvu2325@gmail.com',
//         phone: '0395177093',
//         device: 'User_10',
//         userId: '334332',
//         sensor: {
//             smoke: 3,
//             gas: 3,
//             fire: 0,
//             warning: 0,
//         },
//     },
// ];
function Leaflet({ locate = '9.785439, 105.624398', onClose, ...props }) {
    const [data, setData] = useState({});
    const [position, setPosition] = useState(null);
    const [selectedResult, setSelectedResult] = useState(null);
    const zoom = 17;
    const provider = new OpenStreetMapProvider();

    const sendData = (string) => {
        if (props.parentCallback === undefined) {
        } else {
            props?.parentCallback(string);
        }
    };
    const center = {
        lat: locate.split(',')[0],
        lng: locate.split(',')[1],
    };
    useEffect(() => {
        const fetchDataApi = async () => {
            try {
                const data = await getLocationofAllUser();
                setData(data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchDataApi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const Markers = () => {
        useMapEvents({
            click(e) {
                const latlng = e.latlng;
                setPosition(latlng);
                sendData(`${e.latlng.lat}, ${e.latlng.lng}`);

                const data = {
                    label: 'Some information for the clicked location',
                    x: latlng.lat,
                    y: latlng.lng,
                };
                setSelectedResult(data);
            },
        });
        return position ? (
            <Marker
                key={position[0]}
                position={position}
                interactive={true}
                icon={iconDefault}
                onclick={() => setSelectedResult(null)}
            >
                <Popup>
                    <h3>Vị trí</h3>
                    <h4>
                        Location: {selectedResult.x},{selectedResult.y}
                    </h4>
                    {selectedResult.label}
                </Popup>
            </Marker>
        ) : null;
    };

    return (
        <div className="wrap">
            <MapContainer
                center={center}
                zoom={zoom}
                fullscreenControl={true}
                scrollWheelZoom={false}
                zoomControl={true}
            >
                <Markers />
                <UserMarkers userList={data.users} />
                <FireStationMarkers fireStationList={data.fireStation} />
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <Location />
                <SearchControl
                    provider={provider}
                    showMarker={true}
                    showPopup={false}
                    style={iconDefault}
                    popupFormat={({ result }) => result.label}
                    maxMarkers={1}
                    retainZoomLevel={false}
                    animateZoom={true}
                    autoClose={false}
                    searchLabel={'nhập địa chỉ ở đây!'}
                    keepResult={false}
                />
                {onClose ? (
                    <button className="close-button" onClick={onClose}>
                        <IconSquareX />
                    </button>
                ) : (
                    ''
                )}
            </MapContainer>
        </div>
    );
}

export default Leaflet;
