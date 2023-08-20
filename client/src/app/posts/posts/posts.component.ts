import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/app/_models/post';
import { PostService } from 'src/app/_services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {
  posts$: Observable<Post[]> | undefined
  isCollapsed = true;
  addPostMode = false;
  
  constructor(private postService:  PostService) { }

  ngOnInit(): void {
    this.posts$ = this.postService.getMembers();
    console.log(this.posts$);
  }

  addPostToggle() {
    this.addPostMode = !this.addPostMode
  }

  cancelAddPostMode(event: boolean) {
    this.addPostMode = event;
  }
}

