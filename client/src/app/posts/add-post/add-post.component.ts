import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PostService } from 'src/app/_services/post.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit { 
  @Output() cancelRegister = new EventEmitter();
  addPostForm: FormGroup = new FormGroup({});
  validationErrors: string[] | undefined; 

  constructor(private postService:  PostService, private fb: FormBuilder) { }


  ngOnInit(): void {
    this.initializeForm();      
  }
  
  addPost() {   
    var values = {...this.addPostForm.value};
    this.postService.addPost(values).subscribe({
      next: response => {
        localStorage.setItem('addedPost', 'True');
        window.location.reload();        

      },
      error: error => {
        this.validationErrors = error;
      } 
      
    })
  }

  initializeForm() {    
    this.addPostForm = this.fb.group({      
      title: ['', [Validators.required, 
        Validators.minLength(6), Validators.maxLength(20)]],
      content: ['', [Validators.required,
        Validators.minLength(6), Validators.maxLength(20)]],
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
