import React from "react";
import FilterByProvider from "./FilterByProvider";
import FilterByServiceProviders from "./FilterByServiceProviders";
import FilterByOwner from "./FilterByOwner";
import SearchBar from "./SearchBar";

export default function Home() {
    return (
        <div>
            <div>
                <SearchBar />
            </div>

            <div>
                <FilterByProvider />
            </div>

            <div>
                <FilterByServiceProviders />
            </div>

            <div>
                <FilterByOwner />
            </div>
        </div>
    )
}
