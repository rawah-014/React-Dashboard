
import { faDesktop, faMobileAlt, faTabletAlt } from '@fortawesome/free-solid-svg-icons';

const trafficShares = [
    { id: 1, label: "الطلبات تحت التنفيذ", value: 60, color: "secondary", icon: faDesktop },
    { id: 2, label: "الطلبات المكتملة", value: 30, color: "primary", icon: faMobileAlt },
    { id: 3, label: "الطلبات الملغية", value: 10, color: "quaternary", icon: faTabletAlt }
];



export {
    trafficShares,
    
};