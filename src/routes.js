import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Welcome from './pages/Welcome';
import Logon_Admin from './pages/Logon_Admin';
import Logon_Client from './pages/Logon_Client';
import ProfileAdm from './pages/Profile_adm';
import NewReport from './pages/Report';
import Schedule from './pages/Schedule';
import AnalyseIncident from './pages/AnalyseIncident';
import ProfileClient from './pages/Profile_client';
import RegisterClient from './pages/Register_client';
import RegisterAdm from './pages/Register_adm';

export default function Routes(){
    return(
<BrowserRouter>
<Switch>
    <Route path="/" exact component={Welcome} />
    <Route path="/logon-admin" exact component={Logon_Admin} />
    <Route path="/logon-client" exact component={Logon_Client} />
    <Route path="/register-client" component={RegisterClient} />
    <Route path="/register-adm" component={RegisterAdm} />

    <Route path="/profile-adm" component={ProfileAdm} />
    <Route path="/profile-client" component={ProfileClient} />
    <Route path="/incidents/analyse" component={AnalyseIncident} />
    <Route path="/report" component={NewReport} />
    <Route path="/schedule" component={Schedule} />
</Switch>
</BrowserRouter>
    );
}
