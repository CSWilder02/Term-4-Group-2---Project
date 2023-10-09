import React from 'react'

export const SearchBar = () => {
    return (
        <div className='searchBarWrap'>
            <span class="material-icons">
                search
            </span>
            <input style={{ width: '500px', height: '30px', marginLeft: '20px' }} type='text' placeholder='Search' />
        </div>
    )
}
