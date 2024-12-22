import css from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ onLoad }) => {
  return (
    <div className={css.container}>
      <button className={css.button} type="button" onClick={onLoad}>
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;
