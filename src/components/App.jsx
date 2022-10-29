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
  const [showMore, setShowMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imagesTotal, setImagesTotal] = useState(0);
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
        setImagesTotal(response.data.totalHits);
        setShowMore(true);
      } catch (error) {
        console.log(error);
      }
    };
    loadImages();
  }, [page, query]);
  useEffect(() => {
    if (galleryItems.length === imagesTotal || imagesTotal <= 12) {
      setShowMore(false);
    }
  }, [galleryItems.length, imagesTotal]);
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
