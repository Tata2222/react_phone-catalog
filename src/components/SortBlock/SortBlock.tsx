import React from 'react';
import {useHistory, useLocation} from 'react-router-dom';

let sortParams = [
  {title: 'Newest', value: 'age', typeParams: 'number'},
  {title: 'Price high to low', value:'high_price', typeParams: 'string', direction: 1},
  {title: 'Price low to high',  value:'low_price', typeParams: 'srting', direction: -1}
]

const itemsCount = [8, 16, 32, 64];

export const SortBlock = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const history = useHistory();

  const handleSortItemsCount = (e: React.ChangeEvent<HTMLSelectElement>) => {
    searchParams.set('perPage', e.target.value);
    history.push({
      search: searchParams.toString()
    });
  }

  const handleSortItemsCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    searchParams.set('sortBy', e.target.value);
    history.push({
      search: searchParams.toString()
    });
  }

  return (
  <section className="catalog__sort">
    <form className="catalog__sort-form">
      <div>
        <label className="catalog__sort-title">
          Sort by
        </label>
        <select
          className="catalog__sort-select"
          onChange={(e) => handleSortItemsCategory(e)}
          value={searchParams.get('sortBy') || ''}
        >
          {sortParams.map(param => (
            <option
              key={param.title}
              value={param.value}
            >
              {param.title}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="catalog__sort-title">
          Items on page
        </label>
        <select
          className="catalog__sort-select"
          onChange={(e) => handleSortItemsCount(e)}
        >
          {itemsCount.map(count => (
            <option
              key={count}
              value={count}
            >
              {count}
            </option>
          ))}
        </select>
      </div>
    </form>
  </section>
  )
}
