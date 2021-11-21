import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpEventType,
} from '@angular/common/http';
import { Subject, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { IPost } from './post.model';

@Injectable({ providedIn: 'root' })
export class PostsService {
  error = new Subject<string>();

  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string) {
    const postData: IPost = { title, content };
    this.http
      .post<{ name: string }>(
        'https://my-proj-f4e6f-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
        postData,
        {
          observe: 'response',
        }
      )
      .subscribe(
        (resp) => {
          console.log(resp);
        },
        (error) => {
          this.error.next(error.message);
        }
      );
  }

  fetchPosts() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('Custom', 'ket');

    return this.http
      .get<{ [key: string]: IPost }>(
        'https://my-proj-f4e6f-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
        {
          headers: new HttpHeaders({ 'Custom-Header': 'Hello' }),
          params: searchParams,
          responseType: 'json',
        }
      )
      .pipe(
        map((respData) => {
          const objKeys: string[] = this.extractObjectKeys(respData);
          const objValues: IPost[] = Object.values(respData);
          let postArray: IPost[] = [];
          for (let i = 0; i < objValues.length; i++) {
            postArray.push({ ...objValues[i], id: objKeys[i] });
          }

          return postArray;
        }),
        catchError((errorRes) => {
          return throwError(errorRes);
        })
      );
  }

  deletePosts() {
    return this.http
      .delete(
        'https://my-proj-f4e6f-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
        {
          observe: 'events',
          responseType: 'json',
        }
      )
      .pipe(
        tap((event) => {
          console.log(event);
          if (event.type === HttpEventType.Sent) {
          }

          if (event.type === HttpEventType.Response) {
            console.log(event.body);
          }
        })
      );
  }

  extractObjectKeys(object: any): string[] {
    let objectKeys: string[] = [];
    Object.keys(object).forEach((k: string) => {
      const value: any = object[k];
      if (value !== 'object') {
        objectKeys.push(k);
      } else {
        objectKeys = [...objectKeys, ...this.extractObjectKeys(value)];
      }
    });

    return objectKeys;
  }
}
