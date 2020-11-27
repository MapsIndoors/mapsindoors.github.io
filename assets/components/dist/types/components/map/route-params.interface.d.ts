import { RouteLocation } from './route-location.interface';
import { RouteTravelMode } from './route-travel-mode.interface';
export interface RouteParams {
    origin: RouteLocation;
    destination: RouteLocation;
    travelMode?: RouteTravelMode;
    avoidStairs?: boolean;
    userRoles?: string[];
    fitBounds?: boolean;
}
