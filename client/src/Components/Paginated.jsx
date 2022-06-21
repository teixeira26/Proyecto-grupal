import React from "react";
import styles from "./Paginated.module.css";

export default function Paginated({ itemsPerPage, items, paginated }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(items / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <div className={styles.flex}>
        {pageNumbers &&
          pageNumbers.map((n) => (
            <div className={styles.marginButton}>
              <button
                key={n}
                onClick={() => paginated(n)}
                className="primaryButton"
              >
                {n}
              </button>
            </div>
          ))}
      </div>
    </nav>
  );
}
