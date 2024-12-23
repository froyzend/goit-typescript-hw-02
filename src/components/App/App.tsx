import "./App.css";
import { fetchImages } from "../../server/Image-api";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import { useEffect, useState } from "react";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import toast, { Toaster } from "react-hot-toast";
import ImageModal from "../ImageModal/ImageModal";
import { ImageType } from "../../types/common.types";

const App: React.FC = () => {
  const [images, setImages] = useState<ImageType[]>([]);
  const [query, setQuery] = useState<string | undefined>(undefined);
  const [page, setPage] = useState<number>(1);
  const [totalImages, setTotalImages] = useState<number>(0);
  const [visibleBtn, setVisibleBtn] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const [modalImage, setModalImage] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const searchInput = form.elements.namedItem(
      "searchInput"
    ) as HTMLInputElement;

    if (!searchInput || searchInput.value.trim() === "") {
      toast.error("Please enter your keyword to search field...", {
        style: {
          background: "red",
          color: "white",
          width: 300,
        },
      });
      return;
    }

    const searchQuery = searchInput.value.trim();
    setQuery(searchQuery);
    setPage(1);

    try {
      setErrorMessage(false);
      setLoader(true);

      const { results, total } = await fetchImages(searchQuery, 1);
      setImages(results);
      setTotalImages(total);
      setVisibleBtn(results.length > 0 && results.length < total);

      form.reset();
    } catch (error) {
      console.error(error);
      setVisibleBtn(false);
      setErrorMessage(true);
    } finally {
      setLoader(false);
    }
  };

  const loadMoreImg = async (): Promise<void> => {
    try {
      setErrorMessage(false);
      setLoader(true);
      const nextPage = page + 1;
      setPage(nextPage);
      const { results: newImages } = await fetchImages(query!, nextPage);
      setImages((prevImages) => [...prevImages, ...newImages]);
      const allLoaded = images.length + newImages.length >= totalImages;
      setVisibleBtn(!allLoaded);
    } catch (error) {
      console.error(error);
      setVisibleBtn(false);
      setErrorMessage(true);
    } finally {
      setLoader(false);
    }
  };

  const modalOpen = (id: string): void => {
    const findImage = images.find((image) => image.id === id);
    setSelectedImage(findImage || null);
  };

  const modalClose = (): void => {
    setModalImage(false);
    setSelectedImage(null);
  };

  useEffect(() => {
    if (selectedImage) {
      setModalImage(true);
    }
  }, [selectedImage]);

  useEffect(() => {
    const handleCloseModal = (e: KeyboardEvent): void => {
      if (e.key === "Escape") {
        modalClose();
      }
    };
    if (modalImage) {
      window.addEventListener("keydown", handleCloseModal);
    }
    return () => {
      window.removeEventListener("keydown", handleCloseModal);
    };
  }, [modalImage]);

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 1000,
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      maxWidth: "800px",
      padding: "0",
      backgroundColor: "transparent",
      borderRadius: "8px",
      border: "0",
      overflow: "hidden",
    },
  };

  return (
    <>
      <Toaster
        containerStyle={{
          top: 60,
          left: 10,
          bottom: 20,
          right: 20,
        }}
      />
      <SearchBar sendQuery={handleSubmit} />
      {errorMessage ? (
        <ErrorMessage />
      ) : (
        <ImageGallery cards={images} openModal={modalOpen} />
      )}
      <ImageModal
        selectedImage={selectedImage}
        isOpen={modalImage}
        style={customStyles}
        shouldCloseOnEsc={true}
        shouldCloseOnOverlayClick={true}
        onRequestClose={modalClose}
      />
      {loader ? <Loader /> : ""}
      {visibleBtn ? <LoadMoreBtn onLoad={loadMoreImg} /> : ""}
    </>
  );
};

export default App;
