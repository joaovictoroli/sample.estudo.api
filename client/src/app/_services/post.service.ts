import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Post } from '../_models/post';
import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { User } from '../_models/user';
import { of, map, tap } from 'rxjs';
import { addPost } from '../_models/addPost';
import { PostDetailed } from '../_models/postDetailed';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  baseUrl = environment.apiUrl;
  posts: Post[] = [];
  postsCache = new Map();
  user?: User | null;

  post?: PostDetailed | null;

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

  addReply(content: string, postId: string) {
    console.log(content);
    var error = false;
    this.http.post<addPost>(this.baseUrl + 'posts/' + postId, content, {observe: 'response'}).subscribe(response => {
        if (response.status == 200) {
          console.log('success')          
        } else {
          error = true;
        }
      });
      return error;
  }

  getPostDetail(postId: string) {
    var response = this.http.get<PostDetailed>(this.baseUrl + 'posts/' + postId).pipe(
      map(postDetail => {
        this.post = postDetail;
        console.log(this.post);
        return postDetail;
      })
    )
    if (this.post) {
      console.log('aro')
    }

    return response;
  }

}
