import React from 'react'
import Navbar from '../components/navbar';
import Sidebar from '../components/Sidebar';

const layout = ({children}) => {
  return (
    <React.Fragment>
        <Navbar/>
        <div className="flex w-full" style={{minHeight:"100vh"}} >
                <Sidebar width=""/>
                <main>{children}</main>
        </div>
    </React.Fragment>
  )
}

export default layout