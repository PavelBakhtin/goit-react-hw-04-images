import './styles.css';
import { SearchBar } from './SearchBar';
import { ImageGallery } from './ImageGallery';
import { Component } from 'react';
import axios from 'axios';

const API_KEY = '17553601-11a77715f3e073a989ba7d24f';

export class App extends Component {
  state = {
    galleryItems: [],
    selectedImage: null,
  };
  searchImages = async values => {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: API_KEY,
        q: values,
        per_page: 12,
      },
    });
    console.log(response.data.hits);
    this.setState({
      galleryItems: response.data.hits,
    });
  };
  componentDidUpdate() {
    console.log(this.state.galleryItems.length);
  }
  render() {
    return (
      <div>
        <SearchBar onSearch={this.searchImages} />
        {this.state.galleryItems.length > 0 && (
          <ImageGallery galleryImages={this.state.galleryItems}></ImageGallery>
        )}
      </div>
    );
  }
}
