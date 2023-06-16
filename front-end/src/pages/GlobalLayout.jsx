import React from 'react'
import Navbar from "../components/Navbar/Navbar.jsx"


const layout = ({children}) => {
  return (
    <React.Fragment>
        <Navbar/>
        <main>{children}</main>
    </React.Fragment>
  )
}

export default layout