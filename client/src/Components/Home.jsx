import React from "react";
import FilterByOwner from "./FilterByOwner";
import FilterByProvider from "./FilterByProvider";
import SearchBar from "./SearchBar";

export default function Home() {
    return (
        <div>
            <div>
                <SearchBar />
            </div>

            <div>
                <FilterByOwner />
            </div>

            <div>
                <FilterByProvider />
            </div>
        </div>
    )
}
