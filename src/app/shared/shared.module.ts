import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { SideMenuComponent } from './components/side-menu/side-menu.component';



@NgModule({
  declarations: [
    SideMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    SideMenuComponent
  ]
})
export class SharedModule { }
