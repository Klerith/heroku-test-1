import { ErrorService } from '../errors/error.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { User } from './user.model';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthService {

    constructor( private http: HttpClient, 
                 private errorService: ErrorService ) { }

    signup( user: User ){
        const body = JSON.stringify(user);

        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.http.post('https://angular-adv-test.herokuapp.com/user', body, { headers } )
                    .map( resp => {
                        console.log(resp );
                        return resp;
                    })
                    .catch( err => {
                        this.errorService.handleError( err );
                        return Observable.throw(err)
                    });
    }

    signin( user: User ){
        const body = JSON.stringify(user);

        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.http.post('https://angular-adv-test.herokuapp.com/user/signin', body, { headers } )
                    .map( resp => {
                        console.log(resp );
                        return resp;
                    })
                    .catch( err => {
                        this.errorService.handleError( err );
                        return Observable.throw(err)
                    });
    }

    logout(){
        localStorage.clear();
    }

    isLoggedIn(){
        return localStorage.getItem('token') !== null;
    }


}