import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/interface/post';
import { PostServiceService } from 'src/app/service/post-service.service';

@Component({
  selector: 'app-list-of-posts',
  templateUrl: './list-of-posts.component.html',
  styleUrls: ['./list-of-posts.component.scss']
})
export class ListOfPostsComponent implements OnInit {
  posts: Post[] = [];

  constructor(private postService: PostServiceService) { }

  ngOnInit(): void {
    this.initPosts();
  }

  initPosts() {
    this.postService.getPosts().subscribe(
      (data: Post[]) => {
        this.posts = data;
        console.log(data);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
