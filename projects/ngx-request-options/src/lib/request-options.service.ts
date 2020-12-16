import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Partial } from './types';

type Parameter<T extends (args: any) => any> = T extends (args: infer P) => any ? P : never;

@Injectable()
export class RequestOptions<T> {
    private optionsMap = new Map<string, Partial<T>>();

    /**
     * Retrive the option value
     */
    get<K extends keyof T>(request: HttpRequest<any>, option: K) {
        return this.optionsMap.get(request.url)[option];
    }

    /**
     * Add an options to request
     * 
     * @internal
     */
    set(url: string, data: Partial<T>) {
        this.optionsMap.set(url, data);
        return this;
    }

    /**
     * Clone the request with new metadata and reassign the options to it
     */
    clone(request: HttpRequest<any>, payload: Parameter<typeof request.clone>) {
        return this.changeRequest(request, request.clone(payload));
    }

    /**
     * Sometimes you need to call request.clone() to assign new values to request payload aka metadata
     * thus you need to reassign the options again to the cloned request otherwise the options will lost
     *
     * @param oldRequest the previously used request
     * @param newRequest the cloned request
     * 
     * @internal
     */
    changeRequest(oldRequest: HttpRequest<any>, newRequest: HttpRequest<any>) {
        const options = this.optionsMap.get(oldRequest.url);
        this.set(newRequest.url, options);
        return newRequest;
    }

}
