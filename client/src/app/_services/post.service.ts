import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Post } from '../_models/post';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/user';
import { of, map } from 'rxjs';
import { addPost } from '../_models/addPost';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  baseUrl = environment.apiUrl;
  posts: Post[] = [];
  postsCache = new Map();
  user?: User | null;

  constructor(private http: HttpClient) { }

  getMembers() {
    if (this.posts.length > 0) return of(this.posts);
    return this.http.get<Post[]>(this.baseUrl + 'posts').pipe(
      map(posts => {
        this.posts = posts;
        console.log(posts.length);
        return posts;
      })
    )
  }

  addPost(model: addPost) {
    console.log(model);
    return this.http.post<addPost>(this.baseUrl + 'posts', model);
  }
}
