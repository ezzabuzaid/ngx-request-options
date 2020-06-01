# Request Options
  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/ezzabuzaid/ngx-request-options/pulls) [![Downloads per month](https://flat.badgen.net/npm/dm/@ezzabuzaid/ngx-request-options)](https://www.npmjs.com/package/@ezzabuzaid/ngx-request-options) [![Version](https://flat.badgen.net/npm/v/@ezzabuzaid/ngx-request-options)](https://www.npmjs.com/package/@ezzabuzaid/ngx-request-options) [![License](https://flat.badgen.net/npm/license/@ezzabuzaid/ngx-request-options)](https://www.npmjs.com/package/@ezzabuzaid/ngx-request-options) 

### An elegant way to pass custom options through interceptor from the HTTP client

In a most of the projects, you'll have default URL for your API's gateway that prefixed before sending the request to the backend to avoid adding it to every time and for some reasons you may have a request that doesn't need the default URL, so in this case, you need a way to not prefixing the URL.
You may also have to not send the Authentication header with a request

That's exactly the purpose of this library, is to pass custom options alongside the request and perform specific logic depend on it.

### Installation
`npm install @ezzabuzaid/ngx-request-options`

### Usage
The library was designed to be added without further modification, you'll still use the same `HttpClient` but with one additional augment
the `configure` method that takes the default options before choosing the HTTP method.

1. First of all you need to create your custom options object

```
interface CustomOptions {
	defaultUrl:boolean;
	defaultAuth: boolean;
}
```
2. in `app.module` you need to import `RequestOptionsModule` and to add it to `imports` list in `NgModule`

```
import { RequestOptionsModule } from  '@ezzabuzaid/ngx-request-options';

@NgModule({
	imports: [
		HttpClientModule,
		RequestOptionsModule.forRoot<CustomOptions>({
			// Default options to be applied on all requests
			defaultAuth: true;
			defaultUrl: true
		})
		]
})

  
// Add those lines as they are
declare module '@angular/common/http/http' {
	// Augment HttpClient with the added `configure` method
	export  interface  HttpClient {
		/**
		* Configure request options.
		*/
		configure(options: Partial<CustomOptions>): HttpClient;
	}
}
```
Please make sure that the you call the `forRoot()`.

3. Inject `HttpClient` from `@angular/common/http` in a class then call the new `configure` method
```
@Injectable()
export class MyService {
	constructor(private http: HttpClient) { }
	getData() {
		return this.http
			.configure({ defaultUrl:  false })
			.get('endpoint');
	}
}
```
4. into an interceptor
```
import { RequestOptions } from '@ezzabuzaid/ngx-request-options';
@Injectable()
export class UrlInterceptor implements HttpInterceptor {
	constructor(private requestOptions: RequestOptions<CustomOptions>) { }
	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		let  url = request.url;
		if (this.requestOptions.get(request, 'defaultUrl')) {
			url = environment.endpointUrl + request.url;
		}
		return  next.handle(this.requestOptions.clone(request, { url }));
	}
}
```

**Note** about `request.clone`,  Cloning the request will lose the associated options with it, hence you need to tell the `RequestOptions` that the original request will be garbage collected.
The `request.clone` method will return new request object with new metadata which means that the original request will be lost.

`RequestOptions.clone(request: HttpRequest, metadata)` to resuce, using the `clone` method from `RequestOptions` will do the cloning implicitly and reassign the options again to the new Request object


### Api's
* RequestOptions
	1.  `get(request: HttpRequest<any>, option: keyof  T)`
		* Get an option from the options that was assigned to the request
	2.  `set(request: HttpRequest<any>, data: Partial<T>)` 
		* Assign an options to a request
	3. `delete(request: HttpRequest<any>)`
		* Delete the request options
	4. `clone(request: HttpRequest<any>, requestMetadata)`
		* Clone the request with new metadata and reassign the options to it
	5. `changeRequest(oldRequest: HttpRequest<any>, newRequest: HttpRequest<any>)`
		*  Sometimes you need to call request.clone() to assign new values to request payload aka metadata thus you need to reassign the options again to the cloned request otherwise the options will be lost. call `RequestOptions.clone()` instead as shorter version
		* `oldRequest` the previously used request
		* `newRequest` the cloned request 


## Developer
##### [Ezzabuzaid](mailto:ezzabuzaid@hotmail.com)
- [GitHub](https://github.com/ezzabuzaid)
- [Linkedin](https://www.linkedin.com/in/ezzabuzaid)

## License
##### The MIT License (MIT)

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTExMzY5MzgyMjcsLTE0NTg2NDA4MiwxNT
UyNjM3MTQwLDMxNzAwNDQ2LC0xNDQ2NTU3MzM0LC04MjE1MTgy
NzUsLTE5MzY3MDA3NzBdfQ==
-->