import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { PostDetailed } from 'src/app/_models/postDetailed';
import { PostService } from 'src/app/_services/post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  postDetailed: PostDetailed | undefined
  postId: string | undefined;

  constructor(private route: ActivatedRoute, private postService: PostService, private toastr: ToastrService) {
    // this.accountService.currentUser$.pipe(take(1)).subscribe({
    //   next: user => {
    //     if (user) this.user = user;
    //   }
    // }) get user
  }
  
  ngOnInit(): void {
    this.postId = this.route.snapshot.params['postId'];
    console.log(this.postId)

    if (this.postId ) {
      this.postService.getPostDetail(this.postId ).subscribe(data => {
        this.postDetailed = data;
        console.log(this.postDetailed.replies)
      }, error => {
        console.log(error);
    });   
    } else {
      this.toastr.error("Error occurred");
    }
  }
}
