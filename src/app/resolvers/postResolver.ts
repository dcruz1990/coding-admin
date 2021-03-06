import { Injectable } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

import { Resolve } from '@angular/router';
import { Post } from '../models/Post';

@Injectable()
export class PostResolver implements Resolve<any> {
    constructor(private user: UserService, private auth: AuthService) { }

    userposts: Post[]

    resolve() {
        if (this.auth.loggedIn()) {
            this.user.getUserPosts(this.user.getCurrentUserId()).subscribe(data => this.userposts === data)

            return this.userposts
        }

    }
}
