import s from "./LoadMoreBtn.module.css";

type LoadMoreBtnProps = {
  handleLoadMore: () => void;
};

const LoadMoreBtn = ({ handleLoadMore }: LoadMoreBtnProps) => {
  return (
    <button type="button" className={s.button} onClick={handleLoadMore}>
      Load more images!
    </button>
  );
};

export default LoadMoreBtn;
