import noBooks from "../assets/noBooks.jpeg";
import UserBookCard from "../components/userBookCard";
import { useEffect, useState } from "react";
import styles from "../style/bookCard.module.css";

function UserBooks() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async function () {
      try {
        const res = await fetch(`http://localhost:8000/user-books`, {
          credentials: "include",
        });
        const data = await res.json();
        setBooks(data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) {
    return <div></div>;
  }
  return (
    <>
      <div className={styles.container}>
        {books.length > 0 ? (
          <>
            <UserBookCard books={books}></UserBookCard>
          </>
        ) : (
          <>
            <h2>you don't have books!</h2>
            <img src={noBooks} className={styles.noBooks} />
          </>
        )}
      </div>
    </>
  );
}

export default UserBooks;
