import config from '~/config';
// Layouts
import { HeaderOnly } from '~/layout';
// Pages
import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Dashboard from '~/pages/Dashboard';
import Logout from '~/pages/admin';
import Signup from '~/pages/Signup';
import Instruct from '~/pages/Instruct';
import Service from '~/pages/Service';
import Setting from '~/pages/Setting';
import Security from '~/pages/Security';
import Map from '~/pages/Map';
import Analysis from '~/pages/Analysis';
import MyAccount from '~/pages/MyAccount';
// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home, layout: HeaderOnly },
    { path: config.routes.login, component: Login, layout: HeaderOnly },
    { path: config.routes.logout, component: Logout, layout: HeaderOnly },
    { path: config.routes.signup, component: Signup, layout: HeaderOnly },
];

const privateRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.dashboard, component: Dashboard },
    { path: config.routes.instruct, component: Instruct },
    { path: config.routes.services, component: Service },
    { path: config.routes.setting, component: Setting },
    { path: config.routes.myaccount, component: MyAccount },
    { path: config.routes.security, component: Security },
    { path: config.routes.analysis, component: Analysis },
    { path: config.routes.usermanager, component: Dashboard },
    { path: config.routes.map, component: Map },
];

export { publicRoutes, privateRoutes };
