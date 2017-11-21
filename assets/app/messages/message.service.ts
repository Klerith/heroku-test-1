import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from './message.model';
import { Injectable,EventEmitter } from "@angular/core";
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
import { ErrorService } from '../errors/error.service';



@Injectable()
export class MessageService{

    private messages: Message[] = [];
    messageIsEdit = new EventEmitter<Message>();

    constructor( private http: HttpClient,
                 private errorService: ErrorService ) { }


    addMessage( message:Message ) {
        // this.messages.push( message );

        let body = JSON.stringify(message);

        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        const token = localStorage.getItem('token') 
                ? '?token=' + localStorage.getItem('token') 
                : '';
        
   

        // return this.http.post('http://localhost:3000/message' + token, body, { headers })
        return this.http.post('https://angular-adv-test.herokuapp.com/message' + token, body, { headers })
                .map( (resp: any) => {
                    
                    let mensaje = new Message( 
                            resp.obj.content, 
                            resp.obj.user.firstName, 
                            resp.obj._id, 
                            resp.obj.user._id ); 
                            
                    this.messages.push( mensaje );
                    return message;
                })
                .catch( error =>{
                    this.errorService.handleError( error );
                    return Observable.throw(error)
                });
    }

    getMessages() {
        return this.http.get('https://angular-adv-test.herokuapp.com/message')
                   .map( (resp: any) => {

                    console.log( 'getMessages', resp );
                    const messages = resp.obj;

                    let transformedMessages: Message[] = [];

                    for ( let message of messages ){
                        transformedMessages.push( 
                            new Message( 
                                message.content, 
                                message.user.firstName, 
                                message._id, 
                                message.user._id 
                            ) );
                    }

                    this.messages = transformedMessages;
                    console.log( this.messages );
                    return transformedMessages;
                })
                .catch( err => {
                    this.errorService.handleError( err );
                    return Observable.throw(err)
                });
    }

    editMessage( message: Message ){

        this.messageIsEdit.emit( message );

    }

    updateMessage(message: Message) {
        let body = JSON.stringify(message);
        
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        const token = localStorage.getItem('token') 
        ? '?token=' + localStorage.getItem('token') 
        : '';
        
        return this.http.patch('https://angular-adv-test.herokuapp.com/message/'+ message.messageId + token , body, { headers })
                .catch( error =>{
                    this.errorService.handleError( error );
                    return Observable.throw(error)
                });
    }

    deleteMessage( message: Message ) { 
        this.messages.splice( this.messages.indexOf(message), 1 );

        let body = JSON.stringify(message);
        
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        const token = localStorage.getItem('token') 
        ? '?token=' + localStorage.getItem('token') 
        : '';
        
        return this.http.delete('https://angular-adv-test.herokuapp.com/message/'+ message.messageId + token)
                .catch( error => {
                    this.errorService.handleError( error );
                    return Observable.throw(error)
                });

    }


}