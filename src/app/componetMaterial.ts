// Archivo global de importaciones de modulos para utilizar Angular Material

import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {NgModule} from '@angular/core';


@NgModule({
  imports: [MatButtonModule, MatCheckboxModule],
  exports: [MatButtonModule, MatCheckboxModule],
})
export class MaterialModule { }
