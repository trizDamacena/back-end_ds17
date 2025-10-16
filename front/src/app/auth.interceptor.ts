import { inject } from "@angular/core";
import { HttpInterceptorFn } from "@angular/common/http";
import { AuthService } from "./services/auth.services";

export const authInteceptor: HttpInterceptorFn = (request, next) => {
    const auth = inject(AuthService)
    const token = auth.token()
    
    if(token){
        request = request.clone({setHeaders: {Authorization: `Bearer ${token}`}})

    }

    return next(request) 
}