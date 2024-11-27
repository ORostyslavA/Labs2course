import React, { useState, useCallback } from "react";
import "./Search.css";

function Search({ onSearch, searchValue, setSearchValue }) {
    const debounceSearch = useCallback((callback, delay) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                callback(...args);
            }, delay);
        };
    }, []);

    const debouncedOnSearch = useCallback(
        debounceSearch((value) => {
            onSearch({ target: { value } });
        }, 2000),
        [onSearch]
    );

    const handleInputChange = (e) => {
        e.preventDefault();
        const value = e.target.value;
        setSearchValue(value);
        debouncedOnSearch(value);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search"
                className="search"
                value={searchValue}
                onChange={handleInputChange}
            />
        </div>
    );
}

export default Search;