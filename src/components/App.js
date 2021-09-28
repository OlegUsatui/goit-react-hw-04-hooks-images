import React, { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import css from "./App.module.css"
import Button from './Button/Button'
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Searchbar from './Searchbar/Searchbar';
import getImages from '../utils/request';


export default class App extends Component {
  state = {
    largeImage: null,
    searchImage: null,
    gallery: [],
    page: 1,
    reqStatus: "idle"
    // idle, pending, resolved, rejected
  }

  componentDidUpdate(_, prevState) {
    const { searchImage, page } = this.state;
    if (prevState.searchImage !== searchImage || prevState.page !== page) {
      this.setState({ reqStatus: "pending" })
      getImages(searchImage, page).then(({ hits }) => {
        if (hits.length === 0) {
          this.setState({ reqStatus: "rejected" })
          toast.error('Нету таких изображений');
        } else {
          if (prevState && prevState.searchImage === this.state.searchImage) {
            this.setState({ gallery: [...prevState.gallery, ...hits], reqStatus: "resolved" }, ()=>{window.scrollTo({
              top: document.documentElement.scrollHeight,
              behavior: 'smooth',
            });} );
            
          } else { this.setState({ gallery: hits, reqStatus: "resolved" }) };      
        }
      })
    }
  };
  
  handleFormSubmit = (searchImage) => {
    this.setState({ searchImage })
  };

  openModal = (url) => {
    this.setState({
      largeImage: url
    })
  };

  closeModal = (e) => {
    if (e.target === e.currentTarget) {
      this.setState({
        largeImage: null
      })
    };
  };
    
  onLoadMoreClick = () => {
  this.setState(prevState => ({
        page: prevState.page + 1
      })
       )
  
  };

  render() {
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {this.state.reqStatus === "resolved" &&
          <ImageGallery gallery={this.state.gallery} openModal={this.openModal} page={this.state.page} />}
        {this.state.reqStatus === "resolved" && <Button text="Load more" onLoadMoreClick={this.onLoadMoreClick} />}
        {this.state.reqStatus === "pending" && <Loader type="Circles" color="#00BFFF" height={80} width={80} />}
        <ToastContainer autoClose={2000} />
        {this.state.largeImage && <Modal closeModal={this.closeModal} image={this.state.largeImage} />}
      </div>
    );
  };
};
