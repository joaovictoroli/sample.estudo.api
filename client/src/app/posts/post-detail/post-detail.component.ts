import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  //form
  addReplyForm: FormGroup = new FormGroup({});
  validationErrors: string[] | undefined;

  constructor(private route: ActivatedRoute, private postService: PostService, private toastr: ToastrService,
    private fb: FormBuilder) {
    // this.accountService.currentUser$.pipe(take(1)).subscribe({
    //   next: user => {
    //     if (user) this.user = user;
    //   }
    // }) get user
  }
  
  ngOnInit(): void {
    if (localStorage.getItem('addedReply')) {
      this.toastr.success("Added Successfully");
      localStorage.removeItem('addedReply');
    }

    this.initializeForm();


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

  initializeForm() {    
    this.addReplyForm = this.fb.group({      
      content: ['', [Validators.required,
        Validators.minLength(2), Validators.maxLength(20)]],
    });
  }

  addReply(postId: string) {   
    var values = {...this.addReplyForm.value};
    this.postService.addReply(values, postId).subscribe({
      next: response => {
        localStorage.setItem('addedReply', 'True');
        window.location.reload(); 

      },
      error: error => {
        this.validationErrors = error;
      } 
      
    })
  }
}
