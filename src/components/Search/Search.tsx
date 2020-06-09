import React, { useState, useCallback, useEffect } from 'react';
import {useHistory, useLocation } from 'react-router-dom';
import debounce from 'lodash.debounce';
import cn from 'classnames';
import { navLinks } from '../../helpers/constants';

export const Search = () => {
  const [query, setQuery] = useState<string>('')
  const history = useHistory();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  const handleChange = (value: string): void => {
    setQuery(value);
    applyQuery(value);
  }

  const applyQuery = useCallback(
    debounce((query: string) => {
      if(query.length) {
        searchParams.set('query', query);
      } else {
        searchParams.delete('query');
      }
      history.push({ search: searchParams.toString()})
  }, 1000), [])

  const queryFromURL = (searchParams.get('query') || '').toLowerCase();

  useEffect(() => {setQuery(queryFromURL)}, [queryFromURL]);

  /*const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if(query.length) {
      searchParams.set('query', query);
    } else {
      searchParams.delete('query');
    }
    history.push({
      search: searchParams.toString()
    })
  }*/
  
  const isActiveClass = navLinks.slice(1).some(link => link.path === location.pathname);

  return (
    <div className={cn('customer-section__search',{'active': isActiveClass } )}>
      <form className="customer-section__form" /*onSubmit={handleSubmit}*/>
        <input type="text"
          className="search__input"
          name="search"
          placeholder=""
          value={query}
          onChange={({ target }) => handleChange(target.value)}
      />
      <button
        type="submit"
        className="customer-section__item--search">
      </button>
      </form>
    </div>
  )
}


//autocomplete="off"
/*
const [inptValue, setInputValue] = useState<string>('')

  const handleChange = (value: string): void => {
    setInputValue(value)
    console.log(value);
  }

  const handleSubmit = (e: React.FormEvent): void => {
    console.log('123');
    e.preventDefault();
  }


<form onSubmit={handleSubmit}>

<input type="text"
  className="search__input"
  name="search"
  placeholder=""


/>

<button type="submit" className="customer-section__item--search">
  </button>
</form>*/
