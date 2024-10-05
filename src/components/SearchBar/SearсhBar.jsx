import s from "./SearchBar.module.css";
import toast from "react-hot-toast";

const SearсhBar = ({ onSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const query = form.elements.query.value;
    if (query.trim() === "") {
      return toast.error("Type something in!");
    }
    onSearch(query);
    form.reset();
  };

  return (
    <header>
      <h1 className={s.head}>Welcome to Peach Gallery! 🍑</h1>
      <form onSubmit={handleSubmit} className={s.form}>
        <input
          className={s.input}
          type="text"
          name="query"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button className={s.button} type="submit">
          Search
        </button>
      </form>
    </header>
  );
};

export default SearсhBar;
