import { Entity } from "core/domain/Entity";
import { ParametersErrors } from "core/domain/errors/ParameterErrors";
import { Either, right } from "core/logic/Either";
import { Comment } from "./Comment";
import { Comments } from "./Comments";
import { Like } from "./Like";
import { Likes } from "./Likes";

interface IPostProps {
  content: string;
  asset?: string;
  authorId: string;
  Likes?: Likes;
  Comments?: Comments;
  published?: boolean;
  createdAt?: Date;
}

export class Post extends Entity<IPostProps> {
  private constructor(props: IPostProps, id?: string) {
    super(props, id);
  }

  get content() {
    return this.props.content;
  }

  get asset() {
    return this.props.asset;
  }

  get Comments() {
    return this.props.Comments;
  }

  get Likes() {
    return this.props.Likes;
  }

  get published() {
    return this.props.published;
  }

  get authorId() {
    return this.props.authorId;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  set setAsset(url: string) {
    this.props.asset = url;
  }
  
  public like(like: Like) {
    this.Likes.add(like);
  }

  public deslike(like: Like) {
    this.Likes.remove(like);
  }

  public addComment(comment: Comment) {
    this.Comments.add(comment);
  }

  public removeComment(comment: Comment) {
    this.Comments.remove(comment);
  }

  static create(
    props: IPostProps,
    id?: string
  ): Either<ParametersErrors, Post> {
    const post = new Post(
      {
        ...props,
        published: props.published ?? true,
        Likes: props.Likes ?? Likes.create([]),
        Comments: props.Comments ?? Comments.create([]),
      }, id
    );

    return right(post);
  }
}