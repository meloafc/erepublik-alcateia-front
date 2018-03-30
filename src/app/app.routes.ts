import { LoginComponent } from './pages/login/login.component';
import { ActiveTeamComponent } from './pages/active-team/active-team.component';
import { ManualComponent } from './pages/manual/manual.component';
import { Routes, RouterModule } from '@angular/router';
import { DailyComponent } from './pages/daily/daily.component';

export const routes: Routes = [
    { path: '', component: ActiveTeamComponent },
    { path: 'login', component: LoginComponent },
    { path: 'active-team', component: ActiveTeamComponent },
    { path: 'daily', component: DailyComponent },
    { path: 'manual', component: ManualComponent },
    { path: '**', redirectTo: '' }
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(routes);
