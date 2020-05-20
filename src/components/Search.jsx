import React from 'react';

export function Search() {
  return (
    <form>
      <label for="search">Search: </label>
      <input id="search" type="text" placeholder="Asian restaurants"/>

      {/**TODO: replace with geosuggestion component */}
      <label for="zipcode"> Zip code:</label>
      <input id="zipcode" type="text"/>

      <div>
        <input type="checkbox" name="price1" value="1"/>
        <label for="price1"> $</label>
        <input type="checkbox" name="price2" value="2"/>
        <label for="price2"> $$</label>
        <input type="checkbox" name="price3" value="3"/>
        <label for="price3"> $$$</label>
        <input type="checkbox" name="price4" value="4"/>
        <label for="price3"> $$$$</label>
      </div>

      
    </form>
  )
}

export default Search;