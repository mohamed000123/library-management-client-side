import styles from "../style/bookCard.module.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function BookCard({ books }) {
  const navigate = useNavigate();
  async function handelResrve(ISBN) {
    try {
      const res = await fetch(`http://localhost:8000/reserve/${ISBN}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await res.json();
      if (data) {
        navigate("/reserved-books");
      }
    } catch (err) {
      console.log(err);
    }
  }
  async function handelOrder() {}
  return (
    <>
      {books.length > 0 ? (
        books.map((book) => {
          return (
            <div className={styles.book} key={book.ISBN}>
              <p>
                title:
                <span style={{ color: "blue" }}>{book.title}</span>
              </p>
              <p>
                author:
                <span style={{ color: "blue" }}>{book.title}</span>
              </p>
              <p>
                description:
                <span style={{ color: "blue" }}>{book.description}</span>
              </p>
              {book.availableCopies > 0 ? (
                <Button
                  variant="contained"
                  className={styles.btn}
                  onClick={() => {
                    handelResrve(book.ISBN);
                  }}
                >
                  reserve
                </Button>
              ) : (
                <>
                  <span style={{ color: "red" }}>
                    This book is not available
                  </span>
                  <Button
                    variant="text"
                    className={styles.btn}
                    onClick={() => {
                      handelOrder(book.ISBN);
                    }}
                  >
                    order one
                  </Button>
                </>
              )}
            </div>
          );
        })
      ) : (
        <h2>no books available</h2>
      )}
    </>
  );
}
