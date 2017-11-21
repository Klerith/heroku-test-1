import { Input, Output, EventEmitter } from '@angular/core';
import { Component } from '@angular/core';

import { Message } from './message.model';
import { MessageService } from './message.service';

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styles: [`
    .author {
        display: inline-block;
        font-style: italic;
        font-size: 12px;
        width: 80%;
    }
    .config {
        display: inline-block;
        text-aling: right;
        font-size: 12px;
        width: 19%;
    }
`]
})
export class MessageComponent {

    @Input() message: Message;
    // @Output() editClicked = new EventEmitter<string>()

    constructor( public messageService: MessageService ) { }

    onEdit() {
        // this.editClicked.emit('A new value');
        this.messageService.editMessage(this.message);
    }

    onDelete(message: Message) {
        this.messageService.deleteMessage( this.message )
                .subscribe( resp => console.log( resp ) );
    }

    belongsToUser(){
        return localStorage.getItem('userId') == this.message.userId; 
    }

};