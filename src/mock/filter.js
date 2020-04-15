const maxValueOfNavigationCounter = 20;

const FILTER_NAMES = [
  `Watchlist`,
  `History`,
  `Favorites`,
];

const generateFilter = () => {
  return FILTER_NAMES.map((it) => {
    return {
      name: it,
      count: Math.floor(Math.random() * maxValueOfNavigationCounter),
    };
  });
};

export {generateFilter};
