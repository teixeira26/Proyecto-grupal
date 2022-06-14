import React from "react";

export default function Paginated({ elementsPerPage, elements, paginated }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(elements / elementsPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <nav>
            <div>
                {pageNumbers.length > 0 && pageNumbers.map(n => (
                    <a key={n} onClick={() => paginated(n)}>{n}</a>
                ))}
            </div>
        </nav>
    )
}