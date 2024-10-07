import { useState, useEffect } from "react";
import SearсhBar from "../SearchBar/SearсhBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import fetchImages from "../../services/api";
import ImageModal from "../ImageModal/ImageModal";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import toast, { Toaster } from "react-hot-toast";
import { Image } from "./App.types";

import "./App.css";

function App(): JSX.Element {
  const [images, setImages] = useState<Image[]>([]);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<null | number>(null);
  const [error, setError] = useState<null | boolean>(null);
  const [loader, setLoader] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

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
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoader(false);
      }
    };
    getData();
  }, [query, page]);

  const openModal = (image: Image): void => {
    if (!modalIsOpen) {
      setSelectedImage(image);
      setModalIsOpen(true);
    }
  };

  const closeModal = (): void => {
    setModalIsOpen(false);
    setSelectedImage(null);
  };

  const handleSearch = (name: string): void => {
    setQuery(name);
    setImages([]);
    setPage(1);
    setError(null);
    setTotalPages(null);
  };

  const handleLoadMore = (): void => {
    if (!isLastPage) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <>
      <SearсhBar onSearch={handleSearch} />
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
