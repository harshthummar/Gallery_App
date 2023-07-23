import React from 'react'

export default function SearchInput({handleSearchInput}) {
  
    
  return (
    <div>
       <>
        <input
          className= 'row form-control placeholder-font'
          type="text"
          placeholder="search image"
          onChange={handleSearchInput}
        />
      </>
    </div>
  )
}