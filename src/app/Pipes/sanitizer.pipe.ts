import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer  } from '@angular/platform-browser';


@Pipe({
  name: 'sanitizer'
})
export class SanitizerPipe implements PipeTransform {

  constructor( private domSanitizer:DomSanitizer ){ }

  transform( value: string, url: string): any { // Recibe los parametros y el link
    return this.domSanitizer.bypassSecurityTrustResourceUrl( url + value );  // Retorna el link asegurado para usar
  }

}
