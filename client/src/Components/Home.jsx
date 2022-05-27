import React from "react";
import FilterByOwner from "./FilterByOwner";
import FilterByServiceProviders from "./FilterByServiceProviders";
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
                <FilterByServiceProviders />
            </div>
        </div>
    )
}
