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
import Setting from '~/pages/Security';
import Security from '~/pages/Setting';
// Public routes
const publicRoutes = [
    { path: '/', component: Home, layout: HeaderOnly },
    { path: '/login', component: Login, layout: HeaderOnly },
    { path: '/logout', component: Logout, layout: HeaderOnly },
    { path: '/signup', component: Signup, layout: HeaderOnly },
];

const privateRoutes = [
    { path: '/', component: Home },
    { path: '/dashboard', component: Dashboard },
    { path: '/instruct', component: Instruct },
    { path: '/services', component: Service },
    { path: '/setting', component: Setting },
    { path: '/security', component: Security },

    // { path: '/*', component: }
];

export { publicRoutes, privateRoutes };
