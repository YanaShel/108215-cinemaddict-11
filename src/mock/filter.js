const maxValueOfNavigationCounter = 20;

const filterNames = [
  `Watchlist`,
  `History`,
  `Favorites`,
];

const generationFilter = () => {
  return filterNames.map((it) => {
    return {
      name: it,
      count: Math.floor(Math.random() * maxValueOfNavigationCounter),
    };
  });
};

export {generationFilter};
