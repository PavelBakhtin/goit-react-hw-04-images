import React from 'react';
import PropTypes from 'prop-types';
import css from './SearchBar.module.css';
import { useFormik } from 'formik';
import { BsSearch } from 'react-icons/bs';

export const SearchBar = ({ onSearch }) => {
  const formik = useFormik({
    initialValues: { userQuery: '' },
    onSubmit: ({ userQuery }) => {
      onSearch({ userQuery });
    },
  });
  const { Searchbar, SearchForm, SearchFormButton, SearchFormInput } = css;
  return (
    <header className={Searchbar}>
      <form onSubmit={formik.handleSubmit} className={SearchForm}>
        <button type="submit" className={SearchFormButton}>
          <BsSearch />
        </button>

        <input
          className={SearchFormInput}
          name="userQuery"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={formik.handleChange}
          value={formik.values.userQuery}
        />
      </form>
    </header>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
