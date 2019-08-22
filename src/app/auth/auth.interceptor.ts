    
import { HttpInterceptor, HttpRequest, HttpHandler, HttpUserEvent, HttpEvent,HttpErrorResponse} from "@angular/common/http";
import { Observable,throwError  } from "rxjs";
import { catchError, mergeMap, finalize } from 'rxjs/operators';

import { Injectable } from "@angular/core";

import { MyDataService } from "../my-data.service";
import { Router } from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(public auth: MyDataService){
    }
    intercept(request: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>>{
   
        request = request.clone({
            setHeaders:{
                'Authorization': `Bearer ${this.auth.getToken()}`
            }
        });
        return next.handle(request);
    }
}

//     constructor(private router: Router,private service:MyDataService) { }

//     //add auth token to request
//     private setHeaders(request: HttpRequest<any>) {
//         const token = localStorage.getItem('userToken');
//         debugger
//         if (token) {
//             request = request.clone({
//                 setHeaders: {
//                     // 'content-type': 'application/json', 
//                      'Authorization': `Bearer ${token}`
//                 }
//              });
//         }
//         return request;
//     }

//     intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         request = this.setHeaders(request);
//         return next.handle(request)
//             .pipe(
//             catchError((error: any) => {
//                  if (error instanceof HttpErrorResponse) {
//                     switch (error.status) {    
//                         case 0: 
//                             return throwError( {status: error.status, message: "Unable to connect to server, please contact admin" });
//                         case 400:
//                         case 401:
//                         case 403:
//                         case 404:
//                         case 500:
//                         default:
//                             return throwError({status: error.status, message: error.message });
//                     }
//                 } else if (error.error instanceof ErrorEvent) { // Client Side Error
//                     return throwError({status: error.status, message: error.error.message });
//                 } else {  // Server Side Error
//                     return throwError({status: error.status, message: error.error.message });
//                 }

//              }),
//              finalize(() => {
//                 // do something at the end
//              })
//           );
//     }
// }