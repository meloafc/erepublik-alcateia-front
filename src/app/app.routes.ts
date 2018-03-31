import { LoginComponent } from './pages/login/login.component';
import { ActiveTeamComponent } from './pages/active-team/active-team.component';
import { ManualComponent } from './pages/manual/manual.component';
import { Routes, RouterModule } from '@angular/router';
import { DailyComponent } from './pages/daily/daily.component';
import { TeamListComponent } from './pages/team-list/team-list.component';

export const routes: Routes = [
    { path: '', component: ActiveTeamComponent },
    { path: 'login', component: LoginComponent },
    { path: 'active-team', component: ActiveTeamComponent },
    { path: 'daily', component: DailyComponent },
    { path: 'team/detail', component: ManualComponent },
    { path: 'team/list', component: TeamListComponent },
    { path: '**', redirectTo: '' }
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(routes);
