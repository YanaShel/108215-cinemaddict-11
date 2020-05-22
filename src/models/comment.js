export default class Comment {
  constructor(comment) {
    this.id = comment[`id`];
    this.emotion = comment[`emotion`];
    this.author = comment[`author`];
    this.message = comment[`comment`];
    this.date = comment[`date`];
  }

  static parseComment(comment) {
    return new Comment(comment);
  }

  static parseComments(comments) {
    return comments.map(Comment.parseComment);
  }

  static toRAW(comment) {
    return {
      "comment": comment.message,
      "date": comment.date,
      "emotion": comment.emotion,
      "author": comment.author
    };
  }
}
