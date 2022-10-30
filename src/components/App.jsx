import { useState, useEffect } from 'react';
import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Spinner } from './Loader/Loader';
import { apiService } from './API/apiService';
import css from './App.module.css';
import { useRef } from 'react';

export const App = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [showMore, setShowMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imagesTotal, setImagesTotal] = useState(0);
  const [error, setError] = useState(false);
  const galleryEnd = useRef(null);
  const scrollToBottom = () => {
    galleryEnd.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const onLoadMore = () => {
    setPage(page => page + 1);
  };
  useEffect(() => {
    if (galleryItems.length >= 13) {
      scrollToBottom();
    }
  }, [galleryItems]);
  const searchImages = ({ userQuery }) => {
    setGalleryItems([]);
    setQuery(userQuery);
    setPage(1);
    setError(false);
  };
  useEffect(() => {
    if (query === '') {
      return;
    }
    (async () => {
      try {
        setIsLoading(true);
        const response = await apiService(query, page);
        setIsLoading(false);
        setGalleryItems(prevState => [...prevState, ...response.data.hits]);
        setImagesTotal(response.data.totalHits);
        if (response.data.totalHits !== 0) {
          setShowMore(true);
        }
      } catch (error) {
        setError(true);
        console.log(error);
      }
    })();
  }, [page, query]);
  useEffect(() => {
    if (galleryItems.length === imagesTotal || imagesTotal <= 12) {
      setShowMore(false);
    }
  }, [galleryItems.length, imagesTotal]);
  return (
    <div className={css.App}>
      <SearchBar onSearch={searchImages} />
      {error && <h2>Sorry, something went wrong... Please, try again!</h2>}
      {isLoading && <Spinner />}
      {galleryItems.length > 0 && (
        <ImageGallery galleryImages={galleryItems}></ImageGallery>
      )}
      <div ref={galleryEnd} />
      {showMore && <Button loadMore={onLoadMore} />}
    </div>
  );
};
