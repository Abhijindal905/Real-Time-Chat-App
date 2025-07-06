import React, { useEffect } from 'react'

function Dashboard() {
  const username = localStorage.getItem("username");
  

  return (
  <>
    <h1>Welcome { username }</h1>
  </>  
  );
}

export default Dashboard