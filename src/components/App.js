import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import css from "./App.module.css";
import Button from "./Button/Button";
import ImageGallery from "./ImageGallery/ImageGallery";
import Modal from "./Modal/Modal";
import Searchbar from "./Searchbar/Searchbar";
import getImages from "../utils/request";

export default function App() {
  const [largeImage, setLargeImage] = useState(null);
  const [searchImage, setSearchImage] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [page, setPage] = useState(1);
  const [reqStatus, setReqStatus] = useState("idle");

  useEffect(() => {
    if (searchImage === null) {
      return;
    }

    setReqStatus("pending");
    getImages(searchImage, page).then(({ hits }) => {
      if (hits.length !== 0) {
        setGallery((prev) => [...prev, ...hits]);
        setReqStatus("resolved");

        scrollToDown();
      } else {
        setReqStatus("rejected");
        toast.error("Нету таких изображений");
      }
    });
  }, [searchImage, page]);

  const scrollToDown = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  const closeModal = (e) => {
    if (e.target === e.currentTarget) {
      setLargeImage(null);
    }
  };

  const onLoadMoreClick = () => {
    setPage(page + 1);
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmit={setSearchImage} />
      {reqStatus === "resolved" && (
        <ImageGallery gallery={gallery} openModal={setLargeImage} page={page} />
      )}
      {reqStatus === "resolved" && (
        <Button text="Load more" onLoadMoreClick={onLoadMoreClick} />
      )}
      {reqStatus === "pending" && (
        <Loader type="Circles" color="#00BFFF" height={80} width={80} />
      )}
      <ToastContainer autoClose={2000} />
      {largeImage && <Modal closeModal={closeModal} image={largeImage} />}
    </div>
  );
}
