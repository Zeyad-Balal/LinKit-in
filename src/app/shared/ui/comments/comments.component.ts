import { Component, inject, Input, OnInit } from '@angular/core';
import { CommentsService } from '../../../core/services/comments.service';
import { IComment } from '../../../core/interfaces/icomment';
import { DatePipe } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [DatePipe, ReactiveFormsModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss',
})
export class CommentsComponent implements OnInit {
  private readonly _CommentsService = inject(CommentsService);
  private readonly _FormBuilder = inject(FormBuilder);

  @Input({ required: true }) postId!: string;

  commentsList: IComment[] = [];
  commentForm!: FormGroup;

  ngOnInit(): void {
    this.commentForm = this._FormBuilder.group({
      content: [null, [Validators.required]],
      post: [this.postId],
    });

    this._CommentsService.getPostComments(this.postId).subscribe({
      next: (res) => {
        this.commentsList = res.comments.reverse();
        //console.log(`${this.postId}`, res.comments);
      },
    });
  }

  sendComment(): void {
    this._CommentsService.createComment(this.commentForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.commentsList = res.comments.reverse();
        this.commentForm.get('content')?.reset();
      },
    });
  }
}
