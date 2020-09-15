import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { VoteComponent } from './vote/vote.component';
import { ListComponent } from './list/list.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AppConfigService } from '../services/app-config.service';
import { HttpClientModule } from '@angular/common/http';

export function loadEnvironmentConfig(appConfigService: AppConfigService): Function {
  return () => { return appConfigService.fetchAppConfig() };
}

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    VoteComponent,
    ListComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AppConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: loadEnvironmentConfig,
      multi: true,
      deps: [AppConfigService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
