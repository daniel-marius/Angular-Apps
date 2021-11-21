import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { PostService } from './post.service';
import { Post } from './post.model';

@Injectable({ providedIn: 'root' })
export class BackEndService {
  constructor(private postService: PostService, private http: HttpClient) {}

  saveData(): void {
    const posts: Post[] = this.postService.getPosts();

    this.http
      .put(
        'https://firebaseio.com/posts.json',
        posts
      )
      .subscribe((res) => {
        console.log(res);
      });
  }

  fetchData(): void {
    this.http
      .get<Post[]>(
        'https://firebaseio.com/posts.json'
      )
      .pipe(
        tap((posts: Post[]) => {
          console.log(posts);

          // Send to post.service
          this.postService.setPosts(posts);
        })
      )
      .subscribe();
  }
}
