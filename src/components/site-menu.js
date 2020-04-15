const createFilterItemTemplate = ({name, count}) => {
  return `<a href="#${name}" class="main-navigation__item">${name}
            <span class="main-navigation__item-count">${count}</span>
          </a>`;
};

const createSiteMenu = (filters) => {
  return filters.map((item) => createFilterItemTemplate(item)).join(`\n`);
};

const createSiteMenuTemplate = (filters) => {
  return `<nav class="main-navigation">
            <div class="main-navigation__items">
              <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
               ${createSiteMenu(filters)}
            </div>
            <a href="#stats" class="main-navigation__additional">Stats</a>
          </nav>`;
};

export {createSiteMenuTemplate};
