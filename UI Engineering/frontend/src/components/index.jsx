import React from 'react'
import { Link } from 'react-router-dom'
import './index.css'
const Index = () => {
  return (
    <div class="main-div">
    <div class="main-content">
        <div>
            <h1>WELCOME TO ONLINE LIBRARY MANAGEMENT SYSTEM</h1>
        </div>
        <div class="links">
            <Link to ='/createlibrary'><button>CREATE LIBRARY</button></Link>
            <Link to ='/deletelibrary'><button>DELETE LIBRARY</button></Link>
            <Link to ='/admin'><button>LOGIN AS ADMIN</button></Link>
            <Link to ='/reader'><button>LOGIN AS READER</button></Link>
            <Link to ='/availablelibraries.html'><button>AVAILABLE LIBRARIES</button></Link>
        </div>
    </div>
</div>
  )
}

export default Index
