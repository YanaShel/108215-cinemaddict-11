export default class Comments {
  constructor(comment) {
    this.id = comment[`id`];
    this.emotion = comment[`emotion`];
    this.author = comment[`author`];
    this.message = comment[`comment`];
    this.date = comment[`date`];
  }

  static parseComment(comment) {
    return new Comments(comment);
  }

  static parseComments(comment) {
    return comment.map(Comments.parseComment);
  }

  static toRAW(data) {
    return {
      "comment": data.message,
      "date": data.date,
      "emotion": data.emotion,
      "author": data.author
    };
  }
}
