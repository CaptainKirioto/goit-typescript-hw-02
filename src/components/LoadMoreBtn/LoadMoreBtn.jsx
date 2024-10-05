import s from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ handleLoadMore }) => {
  return (
    <button type="button" className={s.button} onClick={handleLoadMore}>
      Load more images!
    </button>
  );
};

export default LoadMoreBtn;
