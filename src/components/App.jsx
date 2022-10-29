import { useState, useEffect, useRef } from 'react';
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
  const [showMore, setShowMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
    const loadImages = async () => {
      try {
        setIsLoading(true);
        const response = await apiService(query, page);
        setIsLoading(false);
        setGalleryItems(prevState => [...prevState, ...response.data.hits]);
        const totalImages = response.data.totalHits;
        const imagesShown = galleryItems.length;
        if (totalImages === imagesShown || totalImages < 12) {
          return setShowMore(false);
        }
        setShowMore(true);
      } catch (error) {
        console.log(error);
      }
    };
    loadImages();
  }, [page, query]);

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
