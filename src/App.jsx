import { useState, useEffect } from "react";
import SearсhBar from "./components/SearchBar/SearсhBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import fetchImages from "./services/api";
import ImageModal from "./components/ImageModal/ImageModal";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import toast, { Toaster } from "react-hot-toast";

import "./App.css";

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const isLastPage = totalPages !== null && page >= totalPages;

  useEffect(() => {
    if (!query) return;
    const getData = async () => {
      setLoader(true);
      setError(null);
      try {
        const data = await fetchImages(query, page);
        if (data.total_pages === 0) {
          toast.error("There is no images like that");
        }
        setImages((prevImages) => [...prevImages, ...data.results]);
        setTotalPages(data.total_pages);
        // console.log(data);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoader(false);
      }
    };
    getData();
  }, [query, page]);

  const openModal = (image) => {
    if (!modalIsOpen) {
      setSelectedImage(image);
      setModalIsOpen(true);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage(null);
  };

  const handleSearch = (name) => {
    setQuery(name);
    setImages([]);
    setPage(1);
    setError(null);
    setTotalPages(null);
  };

  const handleLoadMore = () => {
    if (!isLastPage) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <>
      <SearсhBar onSearch={handleSearch} query={query} />
      <Toaster position="top-right" reverseOrder={false} />
      {loader && <Loader />}
      {error && <ErrorMessage />}
      {images.length > 0 && (
        <ImageGallery images={images} openModal={openModal} />
      )}
      {
        <ImageModal
          isOpen={modalIsOpen}
          closeModal={closeModal}
          image={selectedImage}
        />
      }
      {images.length > 0 && !loader && !isLastPage && (
        <LoadMoreBtn handleLoadMore={handleLoadMore} />
      )}
    </>
  );
}

export default App;

// const handleLoadMore = () => {
//   setImages((prev) => [...prev, ...images]);
//   setPage((prev) => prev + 1);
//   setLoader(true);
//   setError(null);

//   try {
//     const nextPage = page + 1;
//     const data = await fetchImages(query, nextPage);
//     setImages((prev) => [...prev, ...data.results]);
//   } catch (error) {
//     console.log(error);
//     setError(true);
//   } finally {
//     setLoader(false);
//   }
// };
