import { Component, inject, OnInit } from '@angular/core';
import { PostsService } from '../../core/services/posts.service';
import { IPost } from '../../core/interfaces/ipost';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-time-line',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './time-line.component.html',
  styleUrl: './time-line.component.scss'
})
export class TimeLineComponent implements OnInit {

  private readonly _PostsService = inject(PostsService);

  postsList:IPost[] = [];

  ngOnInit() {
    this._PostsService.getAllPosts().subscribe({
      next: (res) => {
        this.postsList =  res.posts;
        console.log(this.postsList);
      }
    });
  }
}
