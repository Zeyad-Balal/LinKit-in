import { Component, inject, OnInit } from '@angular/core';
import { PostsService } from '../../core/services/posts.service';
import { IPost } from '../../core/interfaces/ipost';
import { CommonModule, DatePipe } from '@angular/common';
import { CommentsComponent } from '../../shared/ui/comments/comments.component';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-time-line',
  standalone: true,
  imports: [DatePipe, CommentsComponent, FormsModule, CommonModule],
  templateUrl: './time-line.component.html',
  styleUrl: './time-line.component.scss',
})
export class TimeLineComponent implements OnInit {
  private readonly _PostsService = inject(PostsService);
  private readonly _FormBuilder = inject(FormBuilder);

  postsList: IPost[] = [];
  savedFile!: File;
  content!: string;
  imagePreview: any;

  ngOnInit() {
    this._PostsService.getAllPosts().subscribe({
      next: (res) => {
        this.postsList = res.posts.reverse();
        console.log(this.postsList);
      },
    });
  }

  sendPost(): void {
    const formData = new FormData();
    formData.append('body', this.content);
    formData.append('image', this.savedFile);

    this._PostsService.createPost(formData).subscribe({
      next: (res) => {
        console.log(res);
        this._PostsService.getAllPosts();
      },
    });
  }

  changeImage(e: Event): void {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.savedFile = input.files[0];

      // Create a FileReader to generate a preview
      const reader = new FileReader();
      reader.onload = (event) => {
        this.imagePreview = event.target?.result; // Store the preview URL
      };
      reader.readAsDataURL(this.savedFile); // Read the file as a data URL
    }
  }
}
