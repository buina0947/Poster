// create-post.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent {
  @Input() posts: any[] = [];
  @Output() postSubmitted = new EventEmitter<any>();

  currentPost: any = {};
  isEditing: boolean = false;
  
  constructor(private http: HttpClient) {}

  submitForm() {
    if (this.isEditing) {
      this.http.put(`http://localhost:3000/posts/${this.currentPost._id}`, this.currentPost).subscribe(
        () => console.log('Post updated successfully on the server.'),
        (error) => console.error('Error updating post on the server:', error)
      );
    } else {
      this.http.post('http://localhost:3000/posts', this.currentPost).subscribe(
        (response: any) => {
          console.log('Post created successfully on the server.');
          this.postSubmitted.emit({ type: 'create', data: { ...this.currentPost, _id: response._id } });
        },
        (error) => console.error('Error creating post on the server:', error)
      );
    }
  }
}
