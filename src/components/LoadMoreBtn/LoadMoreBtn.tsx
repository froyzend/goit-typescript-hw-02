import css from "./LoadMoreBtn.module.css";

interface LoadMoreBtnProps {
  onLoad: () => void;
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ onLoad }) => {
  return (
    <div className={css.container}>
      <button className={css.button} type="button" onClick={onLoad}>
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;
