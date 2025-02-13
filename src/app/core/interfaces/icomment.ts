export interface IComment {
  _id: string;
  commentCreator: CommentCreator;
  post: string;
  createdAt: string;
  id: string;
}

interface CommentCreator {
  _id: string;
  name: string;
  photo: string;
}
