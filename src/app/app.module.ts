import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


import { AppComponent } from './app.component';
import { TableOfOperationsComponent } from './table-of-operations/table-of-operations.component';
import { ContainerComponent } from './container/container.component';
import { AppRoutingModule } from './/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

//Anuglar Matirial
import { MatButtonModule, MatCheckboxModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import {MatTableModule} from '@angular/material/table';
import {MatRadioModule} from '@angular/material/radio';
import {MatInputModule} from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';

// PrimeNG
import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
import {MenuItem} from 'primeng/api';                  //api
import {TableModule} from 'primeng/table';             //Turbo table

// PrimeNG: Animations with Angular 4+
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AppComponent,
    TableOfOperationsComponent,
    ContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    TableModule,
    BrowserAnimationsModule,
    AccordionModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatRadioModule,
    MatInputModule,
    MatTabsModule
  ],

  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
