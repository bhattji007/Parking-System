import React from 'react'
import {Link} from 'react-router-dom';
export const Home = () => {
  return (
    <div>
        <div>
      <Link to="/check_in">check_in </Link>
      <Link to="/check_out">check_out </Link>
    </div>
    </div>
  )
}
