import { Marker, Popup } from 'react-leaflet';
import { iconFireStation, iconHome } from './icon';

export const UserMarkers = ({ userList }) => {
    return (
        <>
            {userList?.map((user, index) => {
                return (
                    <Marker
                        key={user.userId}
                        position={[user.location.lat, user.location.lng]}
                        interactive={true}
                        icon={iconHome}
                    >
                        <Popup className="newPopup">
                            <h3>
                                Vị trí:{user.location.lat},{user.location.lng}
                            </h3>
                            <div>userId: {user.userId}</div>
                            <div>email: {user.email}</div>
                            <div>phone: {user.phone}</div>
                            <div>device: {user.device}</div>
                            {/* <div>
                                sensor:
                                {`{fire: ${user.sensor.fire} |gas: ${user.sensor.gas}|smoke: ${user.sensor.smoke}}| warning: ${user.sensor.warning}}`}{' '}
                            </div> */}
                        </Popup>
                    </Marker>
                );
            })}
        </>
    );
};
export const FireStationMarkers = ({ fireStationList }) => {
    return (
        <>
            {fireStationList?.map((user, index) => {
                return (
                    <Marker
                        key={user.userId}
                        position={[user.location.lat, user.location.lng]}
                        interactive={true}
                        icon={iconFireStation}
                    >
                        <Popup className="newPopup">
                            <h3>
                                Vị trí:{user.location.lat},{user.location.lng}
                            </h3>
                            <div>FireStationId: {user.userId}</div>
                        </Popup>
                    </Marker>
                );
            })}
        </>
    );
};
