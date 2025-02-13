import { Component, inject, Input, OnInit } from '@angular/core';
import { CommentsService } from '../../../core/services/comments.service';
import { IComment } from '../../../core/interfaces/icomment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss',
})
export class CommentsComponent implements OnInit {
  private readonly _CommentsService = inject(CommentsService);

  @Input({ required: true }) postId!: string;

  commentsList: IComment[] = [];

  ngOnInit(): void {
    this._CommentsService.getPostComments(this.postId).subscribe({
      next: (res) => {
        this.commentsList = res.comments;
        //console.log(`${this.postId}`, res.comments);
      },
    });
  }
}
