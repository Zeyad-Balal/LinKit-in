import { Routes } from '@angular/router';
import { TimeLineComponent } from './components/time-line/time-line.component';

export const routes: Routes = [
    
    {
        path: '',
        redirectTo: 'time-line',
        pathMatch: 'full'
    },
    {
        path: 'time-line',
        component: TimeLineComponent,
        title: 'Time Line'
    }
    // Add more routes here // login register etc
];
