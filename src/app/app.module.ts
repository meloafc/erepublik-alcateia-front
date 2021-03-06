import { FeedbackService } from './partials/feedback/feedback.service';
import 'hammerjs';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { ErepublikService } from './services/erepublik.service';
import { HttpClientModule } from '@angular/common/http';
import { TestComponent } from './pages/test/test.component';

import { CdkTableModule } from '@angular/cdk/table';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
} from '@angular/material';
import { DailyComponent } from './pages/daily/daily.component';
import { LoadingComponent } from './partials/loading/loading.component';
import { LoadingService } from './partials/loading/loading.service';
import { ManualComponent } from './pages/manual/manual.component';
import { FormsModule } from '@angular/forms';
import { FeedbackComponent } from './partials/feedback/feedback.component';
import { routing } from './app.routes';
import { ActiveTeamComponent } from './pages/active-team/active-team.component';
import { MdlUpgradeDirective } from './directives/mdl-upgrade.directive';
import { FooterComponent } from './partials/footer/footer.component';
import { LoginComponent } from './pages/login/login.component';
import { TeamListComponent } from './pages/team-list/team-list.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    DailyComponent,
    LoadingComponent,
    ManualComponent,
    FeedbackComponent,
    ActiveTeamComponent,
    MdlUpgradeDirective,
    FooterComponent,
    LoginComponent,
    TeamListComponent
  ],
  imports: [
    routing,
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    HttpClientModule,
    FormsModule,

    CdkTableModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule
  ],
  providers: [
    ErepublikService,
    LoadingService,
    FeedbackService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
