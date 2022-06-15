import React from "react";

export default function Paginated({ itemsPerPage, items, paginated }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(items / itemsPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <nav>
            <div>
                {pageNumbers && pageNumbers.map(n => (
                    <button key={n} onClick={() => paginated(n)}>{n}</button>
                ))}
            </div>
        </nav>
    )
}