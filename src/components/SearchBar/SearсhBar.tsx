import { FormEvent } from "react";
import s from "./SearchBar.module.css";
import toast from "react-hot-toast";

type SearchBarProps = {
  onSearch: (query: string) => void;
};

const SearсhBar = ({ onSearch }: SearchBarProps) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const query = (form.elements.namedItem("query") as HTMLInputElement).value;
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
