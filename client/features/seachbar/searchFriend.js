import React from 'react';

const SearchFriend = ({ searchChangeFriend }) => {
  return (
    <div className='pa2'>
      <input
        className='pa3 ba b--green bg-lightest-blue'
        type='search'
        placeholder='search friend'
        onChange={searchChangeFriend}
      />
    </div>
  );
}

export default SearchFriend;
