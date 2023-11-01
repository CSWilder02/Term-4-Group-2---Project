import React, { useEffect, useState } from 'react'
import SearchEngine from './searchEngine';

export const SearchTest = () => {
    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
        console.log(SearchEngine(searchInput))
    }, [searchInput])

    return (
        <div>
            <input type='text' value={searchInput} onChange={e => setSearchInput(e.target.value)} />
            searchTest</div>
    )
}
