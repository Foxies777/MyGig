import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import Notifications from "./pages/Notifications";
import PageMap from "./pages/PageMap";
import Profile from "./pages/Profile";
import { ADMIN_ROUTE, LOGIN_ROUTE, MAP_ROUTE, NOTIFICATION_ROUTE, REGISTRATION_ROUTE, PROFILE_ROUTE } from "./utils/consts";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: PROFILE_ROUTE,
        Component: Profile
    },
    {
        path: NOTIFICATION_ROUTE,
        Component: Notifications
    }
]

export const publicRoutes = [
    {
        path: MAP_ROUTE,
        Component: PageMap
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
]