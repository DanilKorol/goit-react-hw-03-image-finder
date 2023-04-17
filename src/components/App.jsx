import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchApi } from 'services/fetchApi';
import { Wrapper } from './App.styled';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    loading: false,
    totalHits: null,
    showModal: false,
    largeImage: '',
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (query !== prevState.query || page !== prevState.page) {
      this.showImages();
    }
  }

  showImages = async () => {
    const { query, page } = this.state;

    try {
      this.setState({ loading: true });
      const response = await fetchApi(query, page);

      if (response.hits.length === 0) {
        return toast.warn('there are no images');
      }
      this.setState(prevState => ({
        images: [...prevState.images, ...response.hits],
        totalHits: response.totalHits,
      }));
    } catch (error) {
      toast.error('oops, something went wrong, please, try again');
    } finally {
      this.setState({ loading: false });
    }
  };

  handleSearchSubmit = query => {
    if (this.state.query === query) {
      return toast.warn('Please, enter a new query');
    }
    this.setState({ query, page: 1, images: [], totalHits: null });
  };

  onClickLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  openModal = largeImage => {
    this.setState({ showModal: true, largeImage });
  };

  closeModal = () => {
    this.setState({ showModal: false, largeImage: '' });
  };

  render() {
    const { images, loading, totalHits, showModal, largeImage } = this.state;
    const totalImages = images.length;

    return (
      <Wrapper>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        {loading && <Loader />}

        <ImageGallery images={images} onClick={this.openModal} />
        {!loading && totalHits && (
          <Button
            onClick={this.onClickLoadMore}
            totalImages={totalImages}
            total={totalHits}
          />
        )}
        {showModal && (
          <Modal closeModal={this.closeModal} largeImage={largeImage} />
        )}
        <ToastContainer autoClose={3000} theme="colored" position="top-left" />
      </Wrapper>
    );
  }
}
