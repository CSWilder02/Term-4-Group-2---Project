import React, { useEffect, useState } from 'react'
import SearchEngine from './searchEngine';

export const SearchTest = () => {
    const [searchInput, setSearchInput] = useState("");

    const Items = [
        [{ name: 'Laptop', description: 'High-performance laptop with SSD storage', tags: ['electronics', 'technology'] }],
        [{ name: 'Notebook', description: 'Traditional notebook for writing', tags: ['stationery'] }],
        [{ name: 'Headphones', description: 'Noise-canceling headphones with Bluetooth', tags: ['electronics', 'audio'] }],
        // ... more items
    ];

    useEffect(() => {
        console.log(SearchEngine(searchInput, Items))
    }, [searchInput])

    return (
        <div>
            <input type='text' value={searchInput} onChange={e => setSearchInput(e.target.value)} />
            searchTest</div>
    )
}
