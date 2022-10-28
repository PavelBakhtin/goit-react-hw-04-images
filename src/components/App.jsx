import { useState, useEffect } from 'react';
import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Spinner } from './Loader/Loader';
import { apiService } from './API/apiService';
import css from './App.module.css';

export const App = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalImages, setTotalImages] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // galleryItemsgalleryItems: [],
  // query: '',
  // page: 1,
  // totalImages: 0,
  // showMore: false,
  // isLoading: false,

  const onLoadMore = () => {
    setPage(page => page + 1);
  };

  const searchImages = ({ userQuery }) => {
    setGalleryItems([]);
    setQuery(userQuery);
    setPage(1);
  };
  useEffect(() => {
    if (query === '') {
      return;
    }
    // if (page !== page) {
    setIsLoading(true);
    try {
      const response = apiService(query, page);
      console.log(response);
      setIsLoading(false);
      setGalleryItems(prevState => [
        ...prevState.galleryItems,
        ...response.data.hits,
      ]);
      setTotalImages(response.data.totalHits);
      setShowMore(true);
    } catch (error) {
      console.log(error);
    }
    // }
    // if (query !== query) {
    setIsLoading(true);
    try {
      const response = apiService(query, page);
      setIsLoading(false);
      setGalleryItems([...response.data.hits]);
      setTotalImages(response.data.totalHits);
      setShowMore(true);
    } catch (error) {
      console.log(error);
    }
    // }

    if (totalImages === galleryItems.length) {
      setShowMore(false);
    }
  }, [galleryItems.length, page, query, totalImages]);

  return (
    <div className={css.App}>
      <SearchBar onSearch={searchImages} />
      {isLoading && <Spinner />}
      {galleryItems.length > 0 && (
        <ImageGallery galleryImages={galleryItems}></ImageGallery>
      )}
      {showMore && <Button loadMore={onLoadMore} />}
    </div>
  );
};
