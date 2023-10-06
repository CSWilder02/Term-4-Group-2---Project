import React from 'react'

export const SearchBar = () => {
    return (
        <div className='searchBarWrap'>
            <span class="material-icons">
                search
            </span>
            <input style={{ width: '200px' }} type='text' placeholder='Search' />
        </div>
    )
}
