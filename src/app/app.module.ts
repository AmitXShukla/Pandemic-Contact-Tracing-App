import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './shared/footer.component';
import { HeaderComponent } from './shared/header.component';
import { AdminheaderComponent } from './shared/adminheader.component';
import { AboutusComponent } from './ui/static/aboutus.component';
import { RegisterComponent } from './ui/register/register.component';
import { CheckinComponent } from './ui/register/checkin.component';
import { CheckoutComponent } from './ui/register/checkout.component';
import { TermsComponent } from './ui/register/terms.component';
import { HostComponent } from './ui/host/host.component';
import { GuestComponent } from './ui/guest/guest.component';
import { LoginComponent } from './ui/auth/login.component';
import { SettingsComponent } from './ui/auth/settings.component';
import { SigninComponent } from './ui/admin/signin.component';
import { ConfigComponent } from './ui/admin/config.component';
import { ReportsComponent } from './ui/admin/reports.component';
import { SignupComponent } from './ui/auth/signup.component';

// Angular material
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatIconRegistry } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatBottomSheetModule, MAT_BOTTOM_SHEET_DEFAULT_OPTIONS } from '@angular/material/bottom-sheet';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DomSanitizer } from '@angular/platform-browser';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';

// Agnular Fire
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
// file upload
import { FileUploadComponent } from './shared/dropzone/fileupload.component';
import { DropZoneDirective } from './shared/dropzone/dropzone.directive';
import { FileSizePipe } from './shared/dropzone/filesize.pipe';
import { BadgeComponent } from './ui/register/badge.component';
import { EvacuateComponent } from './ui/admin/evacuate.component';
import { PictureComponent } from './ui/register/picture.component';
// signature pad
import { SignaturePadModule } from 'angular2-signaturepad';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    AboutusComponent,
    RegisterComponent,
    CheckinComponent,
    CheckoutComponent,
    HostComponent,
    GuestComponent,
    LoginComponent,
    SettingsComponent,
    SigninComponent,
    ConfigComponent,
    ReportsComponent,
    SignupComponent,
    FileUploadComponent,
    DropZoneDirective,
    FileSizePipe,
    BadgeComponent,
    AdminheaderComponent,
    EvacuateComponent,
    TermsComponent,
    PictureComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatTabsModule,
    MatMenuModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule,
    MatCardModule,
    MatChipsModule,
    MatListModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatBottomSheetModule,
    MatButtonToggleModule,
    MatRippleModule,
    MatDialogModule,
    MatStepperModule,
    MatExpansionModule,
    MatTableModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    SignaturePadModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'more_vert',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/more_vert.svg'));
    iconRegistry.addSvgIcon(
      'facebook',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/fb.svg'));
    iconRegistry.addSvgIcon(
      'linkedin',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/linkedin.svg'));
    iconRegistry.addSvgIcon(
      'github',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/github.svg'));
    iconRegistry.addSvgIcon(
      'dashboard-black',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/dashboard-black.svg'));
    iconRegistry.addSvgIcon(
      'star',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/star.svg'));
    iconRegistry.addSvgIcon(
      'phone',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/phone.svg'));
    iconRegistry.addSvgIcon(
      'email',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/email.svg'));
    iconRegistry.addSvgIcon(
      'account_circle',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/account_circle.svg'));
    iconRegistry.addSvgIcon(
      'event',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/event.svg'));
    iconRegistry.addSvgIcon(
      'track_changes',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/track_changes.svg'));
    iconRegistry.addSvgIcon(
      'language',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/language.svg'));
    iconRegistry.addSvgIcon(
      'search',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/search.svg'));
    iconRegistry.addSvgIcon(
      'book',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/book.svg'));
    iconRegistry.addSvgIcon(
      'business',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/business.svg'));
    iconRegistry.addSvgIcon(
      'place',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/place.svg'));
    iconRegistry.addSvgIcon(
      'code',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/code.svg'));
    iconRegistry.addSvgIcon(
      'help',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/help.svg'));
    iconRegistry.addSvgIcon(
      'clear',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/clear.svg'));
    iconRegistry.addSvgIcon(
      'vpn',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/vpn.svg'));
    iconRegistry.addSvgIcon(
      'new',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/new.svg'));
    iconRegistry.addSvgIcon(
      'cloud',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/cloud.svg'));
    iconRegistry.addSvgIcon(
      'backspace',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/backspace.svg'));
    iconRegistry.addSvgIcon(
      'add',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/add.svg'));
    iconRegistry.addSvgIcon(
      'edit',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/edit.svg'));
    iconRegistry.addSvgIcon(
      'delete',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/delete.svg'));
    iconRegistry.addSvgIcon(
      'cached',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/cached.svg'));
    iconRegistry.addSvgIcon(
      'create',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/create.svg'));
    iconRegistry.addSvgIcon(
      'employee',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/person.svg'));
    iconRegistry.addSvgIcon(
      'employer',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/group.svg'));
    iconRegistry.addSvgIcon(
      'home',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/home.svg'));
    iconRegistry.addSvgIcon(
      'equalizer',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/equalizer.svg'));
    iconRegistry.addSvgIcon(
      'security',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/security.svg'));
    iconRegistry.addSvgIcon(
      'radio_on',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/radio_on.svg'));
    iconRegistry.addSvgIcon(
      'radio_off',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/radio_off.svg'));
    iconRegistry.addSvgIcon(
      'salary',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/salary.svg'));
    iconRegistry.addSvgIcon(
      'drop_down',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/drop_down.svg'));
    iconRegistry.addSvgIcon(
      'twitter',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/twitter_1.svg'));
  }
}
