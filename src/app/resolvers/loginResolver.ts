import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

import { Resolve } from '@angular/router';

@Injectable()
export class LoginResolver implements Resolve<any> {
    constructor() { }

    resolve() {
        if (localStorage.getItem('token')) {
            return true
        } else {
            return false
        }

    }
}
