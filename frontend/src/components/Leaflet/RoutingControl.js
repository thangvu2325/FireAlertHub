import L from 'leaflet';
import { createControlComponent } from '@react-leaflet/core';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

const createRoutineMachineLayer = ({ position, start, end, color }) => {
    const instance = L.Routing.control({
        position,
        waypoints: [start, end],
        lineOptions: {
            styles: [
                {
                    color: 'blue',
                    opacity: 0.6,
                    weight: 4,
                },
            ],
        },
        plan: L.Routing.plan([start, end], {
            createMarker: function () {
                return null;
            },
        }),
        routeWhileDragging: true,
        // reverseWaypoints: true,
        // showAlternatives: true,
    });
    return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
