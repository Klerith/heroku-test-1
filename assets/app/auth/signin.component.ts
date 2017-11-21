import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { User } from './user.model';


@Component({
    selector: 'app-signin',
    templateUrl: 'signin.component.html'
})
export class SigninComponent{
    

    myForm: FormGroup;

    constructor( private authService: AuthService,
                 private router: Router ){ }
    
        ngOnInit() {
            this.myForm = new FormGroup({
                email: new FormControl(null, [Validators.required, Validators.email] ),
                password: new FormControl(null, Validators.required )
            });
        }
    
        onSubmit(){
            // console.log( this.myForm );
            const user = new User( this.myForm.value.password, this.myForm.value.email )

            console.log( user );

            this.authService.signin( user )
                        .subscribe( data =>{
                            localStorage.setItem('token', data.token);
                            localStorage.setItem('userId', data.userId);

                            this.router.navigateByUrl('/');
                        },
                    error => console.log( error ));

            // this.myForm.reset();
        }

}