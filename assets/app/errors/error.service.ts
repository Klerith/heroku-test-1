import { EventEmitter, Injectable } from '@angular/core';
import { Error } from './error.model';

@Injectable()
export class ErrorService {
    errorOccurred = new EventEmitter<Error>();

    handleError(error: any){
        
        const errorData = new Error( error.error.title, error.error.message );

        console.log( errorData );

        this.errorOccurred.emit( errorData );
    }

}