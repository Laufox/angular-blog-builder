import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleFormComponent } from './article-form/article-form.component';
import { SettingsModalComponent } from './settings-modal/settings-modal.component';
import { AboutModalComponent } from './about-modal/about-modal.component';
import { ArticleModalComponent } from './article-modal/article-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeaderComponent,
    ArticleListComponent,
    ArticleFormComponent,
    SettingsModalComponent,
    AboutModalComponent,
    ArticleModalComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
