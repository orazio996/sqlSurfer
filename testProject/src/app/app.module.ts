import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CodeEditorModule } from '@ngstack/code-editor';
import { AppRoutingModule } from './app-routing.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { diff_match_patch } from 'diff-match-patch';

import { AppComponent } from './app.component';
import { WorkspaceComponent } from './components/workspace/workspace.component';
import { EditorComponent } from './components/editor/editor.component';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { ResponseViewComponent } from './components/response-view/response-view.component';
import { CronologiaComponent } from './components/cronologia/cronologia.component';
import { ErrorComponent } from './components/error/error.component';
import { NotifyComponent } from './components/notify/notify.component';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ModaleComponent } from './components/modale/modale.component';
import { DbModelsComponent } from './components/db-models/db-models.component';
import { ModelsEditorComponent } from './components/models-editor/models-editor.component';





@NgModule({ declarations: [
        AppComponent,
        WorkspaceComponent,
        EditorComponent,
        ResponseViewComponent,
        HomeComponent,
        SignupComponent,
        SigninComponent,
        ErrorComponent,
        NotifyComponent,
        CronologiaComponent,
        ModaleComponent,
        DbModelsComponent,
        ModelsEditorComponent,
    ],
    bootstrap: [AppComponent], 
    imports: [
        BrowserModule,
        AppRoutingModule,
        CodeEditorModule.forRoot(),
        FormsModule,
        ReactiveFormsModule
    ], 
    providers: [
        provideAnimationsAsync(),
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }
