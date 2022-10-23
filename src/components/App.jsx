import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Component } from 'react';
import { Button } from './Button/Button';
import { Spinner } from './Loader/Loader';
import { apiService } from './API/apiService';
import css from './App.module.css';

export class App extends Component {
  state = {
    galleryItems: [],
    query: '',
    page: 1,
    totalImages: 0,
    showMore: false,
    isLoading: false,
  };
  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  searchImages = async ({ userQuery }) => {
    this.setState({
      galleryItems: [],
      query: userQuery,
      page: 1,
    });
    console.log(this.state.query);
  };
  async componentDidUpdate(_, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.setState({ isLoading: true });
      const response = await apiService(this.state.query, this.state.page);
      console.log(response);
      this.setState({
        isLoading: false,
        galleryItems: [...prevState.galleryItems, ...response.data.hits],
        totalImages: response.data.totalHits,
        showMore: true,

        // if (this.state.totalImages - this.state.galleryItems.length === 0) {
        //   this.setState({ showMore: false });
        // }
      });
    }
  }

  render() {
    const { isLoading, galleryItems, showMore } = this.state;
    return (
      <div className={css.App}>
        <SearchBar onSearch={this.searchImages} />
        {isLoading && <Spinner />}
        {galleryItems.length > 0 && (
          <ImageGallery
            galleryImages={galleryItems}
            onClick={this.toggleModal}
          ></ImageGallery>
        )}
        {showMore && <Button loadMore={this.onLoadMore} />}
      </div>
    );
  }
}
