import React from 'react'

const PageNotFound = () => {
  return (
    <div style={{
        height: '87vh',
        display: 'flex',
        justifyContent : 'center',
        alignItems : 'center',
    }}>
        <div className="heading" style={{
            color : '#b30ab0',
            fontSize : "4rem",
        }}> 404 || Page Not Found </div>
    </div>
  )
}

export default PageNotFound