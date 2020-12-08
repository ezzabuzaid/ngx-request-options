import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { RequestOptions } from './request-options.service';

@Injectable()
export class RequestOptionsInterceptor implements HttpInterceptor {

    constructor(
        private requestData: RequestOptions<any>,
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(finalize(() => {
                this.requestData.delete(request);
            }));
    }

}
