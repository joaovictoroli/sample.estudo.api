import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  NgForm,
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, take, of } from 'rxjs';
import { PostDetailed } from 'src/app/_models/postDetailed';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { PostService } from 'src/app/_services/post.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrMsgService } from 'src/app/_services/toastr-msg.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
})
export class PostDetailComponent implements OnInit {
  postDetailed$: Observable<PostDetailed> | undefined;
  postId: string | undefined;
  user?: User;
  replyId: string | undefined;

  //form
  addReplyForm: FormGroup = new FormGroup({});
  validationErrors: string[] | undefined;

  //modal
  modalRef?: BsModalRef;
  message?: string;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private accountService: AccountService,
    private modalService: BsModalService,
    private routerTo: Router,
    private toastrMsg: ToastrMsgService
  ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: (user) => {
        if (user) this.user = user;
      },
    });
  }

  ngOnInit(): void {
    //this.toastrMsg.getPending();
    this.initializeForm();

    this.postId = this.route.snapshot.params['postId'];

    this.postDetailed$ = this.postService.getPostDetail(this.postId!);

    if (localStorage.getItem('addedReply') === 'True') {
      this.toastr.success('Reply Added Successfully');
      localStorage.removeItem('addedReply');
    }
    if (localStorage.getItem('deletedReply') === 'True') {
      this.toastr.success('Reply Deleted Successfully');
      localStorage.removeItem('deletedReply');
    }

    this.addReplyForm.valueChanges.subscribe((result) => {
      this.validationErrors = result.error;
    });
  }

  initializeForm() {
    this.addReplyForm = this.fb.group({
      content: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
        ],
      ],
    });
  }

  addReply() {
    var values = { ...this.addReplyForm.value };

    var is_error = this.postService.addReply(values, this.postId!);
    if (!is_error) {
      console.log('heelo');
      this.toastrMsg.setPending('Added Reply Successfully');
      localStorage.setItem('addedReply', 'True');
      //this.routerTo.navigateByUrl('/post-detail/' + this.postId);
      window.location.reload();
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  openModalReply(template: TemplateRef<any>, replyId: string) {
    this.replyId = replyId;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirmDeletePost(): void {
    if (this.postId) {
      var is_error = this.postService.deletePost(this.postId);
      if (!is_error) {
        this.toastrMsg.setPending('Deleted Successfully');
        localStorage.setItem('deletedPost', 'True');
        this.routerTo.navigateByUrl('/posts');
      }
    }
    this.modalRef?.hide();
    // this.toastrMsg.setPending('Deleted Successfully');
    //this.modalRef?.hide();

    // if (this.postId) {
    //   var is_error = this.postService.deletePost(this.postId);
    //   if (!is_error) {
    //     localStorage.setItem('DeletedPost', 'True');
    //     this.routerTo.navigateByUrl('/posts');
    //   }
    // } else {
    //   this.toastr.error('Something went wrong');
    // }
    // this.modalRef?.hide();
  }

  confirmDeleteReply(): void {
    if (this.postId && this.replyId) {
      console.log('PostId' + this.postId);
      console.log('ReplyId' + this.postId);
      this.postService.deleteReply(this.postId, this.replyId);
      localStorage.setItem('deletedReply', 'True');
      window.location.reload();
      //this.toastrMsg.setPending('Deleted Successfully');
      this.modalRef?.hide();
    }
  }

  decline(): void {
    this.modalRef?.hide();
  }
}
