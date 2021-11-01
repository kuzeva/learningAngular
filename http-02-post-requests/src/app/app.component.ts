import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Post } from './post.model';
import { PostService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching = false;
  constructor(private http: HttpClient, private postsService: PostService) { }

  ngOnInit() {
    this.fetchingPosts();
  }

  
  onCreatePost(postData: Post) {
    console.log(postData);
    this.postsService.createAndStorePost(postData.title, postData.content);
    
  }

  onFetchPosts() {
    // Send Http request
    this.fetchingPosts()
  }

  onClearPosts() {
    // Send Http request
    this.postsService
      .deletePosts()
      .subscribe(() => {
        this.loadedPosts = [];
      });
  }
  
  private fetchingPosts() {
    this.isFetching = true;
    this.postsService.fetchPosts().subscribe((posts) => {
      this.isFetching = false;
      this.loadedPosts = posts;
    });
  }
}
