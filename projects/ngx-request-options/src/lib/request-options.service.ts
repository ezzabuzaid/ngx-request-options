import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Partial } from './types';

type Parameter<T extends (args: any) => any> = T extends (args: infer P) => any ? P : never;

@Injectable()
export class RequestOptions<T> {
    private optionsMap = new WeakMap<HttpRequest<any>, Partial<T>>();

    /**
     * Retrive the option value
     */
    get<K extends keyof T>(request: HttpRequest<any>, option: K) {
        return this.optionsMap.get(request)[option];
    }

    /**
     * Add an options to request
     */
    set(request: HttpRequest<any>, data: Partial<T>) {
        this.optionsMap.set(request, data);
        return this;
    }

    /**
     * Delete the request options
     */
    delete(request: HttpRequest<any>) {
        this.optionsMap.delete(request);
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
     */
    changeRequest(oldRequest: HttpRequest<any>, newRequest: HttpRequest<any>) {
        const options = this.optionsMap.get(oldRequest);
        this.set(newRequest, options);
        return newRequest;
    }

}
