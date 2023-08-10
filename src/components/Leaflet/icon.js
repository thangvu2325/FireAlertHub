import L from 'leaflet';
import images from '~/assets/images';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
export const iconDefault = new L.Icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
    shadowAnchor: [12, 41], // the same for the shadow
    popupAnchor: [0, -41], // point from which the popup should open relative to the iconAnchor
});
export const iconUser = new L.Icon({
    iconUrl: images.userIcon,
    iconSize: [25, 25], // size of the icon
    iconAnchor: [20, 58], // changed marker icon position
    popupAnchor: [0, -60], // changed popup position
});
export const iconHome = new L.Icon({
    iconUrl: images.homeIcon,
    iconSize: [50, 60], // size of the icon
    iconAnchor: [20, 58], // changed marker icon position
    popupAnchor: [0, -60], // changed popup position
});
export const iconFireStation = new L.Icon({
    iconUrl: images.fireStationIcon,
    iconSize: [50, 60], // size of the icon
    iconAnchor: [20, 58], // changed marker icon position
    popupAnchor: [0, -60], // changed popup position
});
