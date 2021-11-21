import { EventEmitter, Injectable } from '@angular/core';

import { Post } from './post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  postsChanged: EventEmitter<Post[]> = new EventEmitter();
  posts: Post[] = [
    // new Post(
    //   'Nature',
    //   'Nature',
    //   'https://upload.wikimedia.org/wikipedia/commons/4/42/Shaqi_jrvej.jpg',
    //   'test@test.com',
    //   new Date(),
    //   3
    // ),
    //
    // new Post(
    //   'Nature2',
    //   'Nature2',
    //   'https://upload.wikimedia.org/wikipedia/commons/4/42/Shaqi_jrvej.jpg',
    //   'test2@test2.com',
    //   new Date(),
    //   4
    // ),
    //
    // new Post(
    //   'Nature3',
    //   'Nature3',
    //   'https://upload.wikimedia.org/wikipedia/commons/4/42/Shaqi_jrvej.jpg',
    //   'test3@test3.com',
    //   new Date(),
    //   5
    // ),
  ];

  constructor() {}

  getPosts() {
    return this.posts;
  }

  deletePost(index: number) {
    this.posts.splice(index, 1);
  }

  addPost(post: Post) {
    this.posts.push(post);
  }

  updatePost(index: number, post: Post) {
    this.posts[index] = post;
  }

  getPost(index: number) {
    return this.posts[index];
  }

  likePost(index: number) {
    this.posts[index].likes += 1;
  }

  setPosts(posts: Post[]) {
    this.posts = posts;
    this.postsChanged.emit(posts);
  }
}
