import React from 'react';
import './styles.css';
import { useFormik } from 'formik';

export const SearchBar = ({ onSearch }) => {
  const formik = useFormik({
    initialValues: { searchQuery: '' },
    onSubmit: (values, actions) => {
      onSearch(values.searchQuery);
      actions.resetForm();
    },
  });
  return (
    <header className="searchbar">
      <form onSubmit={formik.handleSubmit} className="form">
        <button type="submit" className="button">
          <span className="button-label">Search</span>
        </button>

        <input
          className="input"
          name="searchQuery"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={formik.handleChange}
          value={formik.values.searchQuery}
        />
      </form>
    </header>
  );
};
