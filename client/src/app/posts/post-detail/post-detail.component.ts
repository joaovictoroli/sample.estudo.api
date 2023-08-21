import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgForm ,FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, take } from 'rxjs';
import { PostDetailed } from 'src/app/_models/postDetailed';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { PostService } from 'src/app/_services/post.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  postDetailed: PostDetailed | undefined
  postId: string | undefined;
  user?: User;

  //form
  addReplyForm: FormGroup = new FormGroup({});
  validationErrors: string[] | undefined;

  //modal
  modalRef?: BsModalRef;
  message?: string;

  constructor(private route: ActivatedRoute, private postService: PostService, private toastr: ToastrService,
    private fb: FormBuilder, private accountService: AccountService, private modalService: BsModalService) {
      this.accountService.currentUser$.pipe(take(1)).subscribe({
        next: user => {
          if (user) this.user = user;
        }
      })
  }
  
  ngOnInit(): void {
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

    if (localStorage.getItem('addedReply') === "True") {
      this.toastr.success("Added Successfully");
      localStorage.removeItem('addedReply');
    }

    this.addReplyForm.valueChanges.subscribe(result => {
      this.validationErrors = result.error;
})
  }

  initializeForm() {    
    this.addReplyForm = this.fb.group({      
      content: ['', [Validators.required,
        Validators.minLength(2), Validators.maxLength(20)]],
    });
  }

  addReply(postId: string) {   
    var values = {...this.addReplyForm.value};
    // this.postService.addReply(values, postId);
    // window.
    
    var is_error = this.postService.addReply(values, postId);
    if (!is_error) {      
      localStorage.setItem('addedReply', 'True')
      window.location.reload();
      //this.toastr.success("Added Succesfully")
      }  
    }

    openModal(template: TemplateRef<any>) {
      this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
    }
    
    confirm(): void {
      this.message = 'Confirmed!';
      this.modalRef?.hide();
    }
       
    decline(): void {
      this.message = 'Declined!';
      this.modalRef?.hide();
    }  
}
