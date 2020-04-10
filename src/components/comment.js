const createCommentTemplate = (comment) => {
  const {emotion, author, message} = comment;
  return `<li class="film-details__comment">
  <span class="film-details__comment-emoji">
  <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
  </span>
  <div>
  <p class="film-details__comment-text">${message}</p>
<p class="film-details__comment-info">
  <span class="film-details__comment-author">${author}</span>
<span class="film-details__comment-day">2019/12/31 23:59</span>
<button class="film-details__comment-delete">Delete</button>
  </p>
  </div>
  </li>`;
};

const createCommentsTemplate = (comments) => {
  return comments.map((item) => {
    return createCommentTemplate(item);
  }).join(`\n`);
};

export {createCommentsTemplate};
