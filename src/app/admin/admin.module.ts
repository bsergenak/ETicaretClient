import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from './layout/layout.module';
import { ComponentsModule } from './components/components.module';
import { CreateComponent } from './components/role/create/create.component';
import { ListComponent } from './components/role/list/list.component';



@NgModule({
    declarations: [
    CreateComponent,
    ListComponent
  ],
    imports: [
        CommonModule,
        LayoutModule,
        ComponentsModule
    ],
    exports: [
        LayoutModule
    ]
})
export class AdminModule { }