// import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType } from '@angular/common/http';
// import { tap } from 'rxjs/operators';

// export class AuthInterceptorService implements HttpInterceptor{
//     // intercept(req: HttpRequest<any>, next: HttpHandler){
//     //     console.log("request is being sent",req.method);
//     //     console.log(req.url);
//     //     const modifiedRequest = req.clone({
//     //         headers: req.headers.append('auth','ANZ')
//     //     });
//     //     // return next.handle(req);
//     //        return next.handle(modifiedRequest).pipe(
//     //            tap(event =>{
//     //                console.log(event);
//     //                if(event.type === HttpEventType.Response){
//     //                     console.log("************event.body***************");
//     //                     console.log(event.body);
//     //                }
//     //            })
//     //        )

//     // }
// }