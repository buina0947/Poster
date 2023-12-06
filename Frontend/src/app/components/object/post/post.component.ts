import { HttpClient } from '@angular/common/http';
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
  editedPost: Post = {} as Post;

  constructor(private http: HttpClient) {}

  toggleEditMode() {
    if (this.editMode) {
      this.updatePost();
    } else {
      this.copyPostData();
    }

    this.editMode = !this.editMode;
  }

  removePost(id: string) {
    const postId = id;
    console.log('Clicked to remove post:', postId);
    const apiUrl = `http://localhost:3000/posts/${postId}`;
    
    this.http.delete(apiUrl).subscribe(
      (response) => {
        console.log('Post deleted successfully:', response);
      },
      (error) => {
        console.error('Error deleting post:', error);
      }
    );
  }

  async save() {
    this.updatePostOnServer();
    this.editMode = false;
  }

  private copyPostData() {
    this.editedPost = { ...this.post };
  }

  private updatePost() {
    this.post = { ...this.editedPost };
  }

  private async updatePostOnServer() {
    const apiUrl = `http://localhost:3000/posts/${this.post._id}`;
    console.log('Will send:', this.post);

    try {
      const response = await this.http.put(apiUrl, this.post).toPromise();

      if (response) {
        console.log('Updated post response:', response);
      } else {
        console.error('Error updating post:', 'Server did not respond properly');
      }
    } catch (error) {
      console.error('Error updating post:', error);
    }
  }
}
