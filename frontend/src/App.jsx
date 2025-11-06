import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Learn from '../pages/Learn'
import Layout from './components/layouts/Layout'
import CreateContent from '../pages/CreateContent'
import CreateHomePage from './components/CreateHomePage'
import AboutPage from '../pages/AboutPage'
import ContactPage from '../pages/Contactpage'
import ReadContent from '../pages/ReadContent'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import LandingPage from '../pages/LandingPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout wraps all pages */}
        <Route path="/" element={<Layout />}>
          {/* index = default route inside Layout */}
          <Route index element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/create" element={<CreateContent />} />
          <Route path="/read" element={<ReadContent />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact-us" element={<ContactPage />} />

        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
