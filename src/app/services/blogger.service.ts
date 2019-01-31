import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class BloggerService {


  constructor( private http: HttpClient) { }

  getPostBlogger() {
    return this.http.get("https://www.googleapis.com/blogger/v3/blogs/2811544302412945813/posts?key=AIzaSyDC9bpgeN4HCnUwffRJombvFBq5wRb7Eyg")
    .subscribe(
      success => {
        let posts:any = success;//agregar la variable para extraer los datos
        console.log("sucessss de obtener pks. ",posts);
        return posts;
      },
      err => {

        console.log("Error ",err);
      }
    )
  }

}
