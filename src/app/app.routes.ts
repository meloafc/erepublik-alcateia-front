import { ManualComponent } from './pages/manual/manual.component';
import { Routes, RouterModule } from '@angular/router';
import { DailyComponent } from './pages/daily/daily.component';

export const routes: Routes = [
    { path: '', component: DailyComponent },
    { path: 'manual', component: ManualComponent },
    { path: '**', redirectTo: '' }
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(routes);
