import { Component, Input } from '@angular/core';
import { Post } from 'src/app/interface/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  @Input() post!: Post;
  editMode = false;
  editedPost: Post = {} as Post; // Use Post type for editedPost

  constructor() {}

  toggleEditMode() {
    if (this.editMode) {
      // Save changes and exit edit mode
      this.post.title = this.editedPost.title;
      this.post.description = this.editedPost.description;
      this.post.author = this.editedPost.author;
    } else {
      // Enter edit mode
      // Copy values from post to editedPost
      this.editedPost = { ...this.post };
    }

    this.editMode = !this.editMode;
  }

  removePost() {
    console.log('Clicked to remove post:', this.post._id);

    // Implement post removal logic here, possibly using an API call
  }

  async save() {
    // Update post data
    this.post.title = this.editedPost.title;
    this.post.description = this.editedPost.description;
    this.post.author = this.editedPost.author;

    // // Prepare updated post data for API call
    // const updatedPostData: Post = {
    //   _id: this.post._id, // Include the post ID
    //   title: this.post.title,
    //   description: this.post.description,
    //   author: this.post.author,
    // };
    

 

    // Send updated post data to the backend API
    const apiUrl = `http://localhost:3000/posts/${this.post._id}`;
console.log("Will sed:", this.post)
    try {
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.post),
      });

      if (response.ok) {
        const data: Post = await response.json();
        console.log('Updated post response:', data);
        // Handle successful response
      } else {
        console.error('Error updating post:', response.statusText);
        // Handle error response
      }
    } catch (error) {
      console.error('Error updating post:', error);
      // Handle network error or other exceptions
    }

    this.editMode = false;
  }
}
