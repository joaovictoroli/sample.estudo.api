import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  
  constructor(private postService:  PostService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.posts$ = this.postService.getMembers();    
    this.checkLocalStorage();
  }

  addPostToggle() {
    this.addPostMode = !this.addPostMode
  }

  cancelAddPostMode(event: boolean) {
    this.addPostMode = event;
  }

  postsDetails(id: number){
    this.router.navigate(['post-detail', id]);
  }


  checkLocalStorage() {
    if (localStorage.getItem('addedPost') === 'True') {
      this.toastr.success("Added Successfully");
      localStorage.removeItem('addedPost');
    }
  }
}

