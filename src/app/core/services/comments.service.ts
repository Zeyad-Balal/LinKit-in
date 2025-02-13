import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/env';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private _HttpClient: HttpClient) { }

  createComment(data: object): Observable<any> {

    return this._HttpClient.post(`${environment.baseUrl}/comments`, data)
  }
  getPostComments(postId: string): Observable<any> {
      
      return this._HttpClient.get(`${environment.baseUrl}/posts/${postId}/comments`)
  }

  upadteCommment(commentId: string, data: object): Observable<any> {
    return this._HttpClient.put(`${environment.baseUrl}/comments/${commentId}`, data)
  }

  deleteCommment(commentId: string): Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}/comments/${commentId}`)
  }

}
