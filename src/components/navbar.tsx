'use client'

import React from 'react'

export const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white text-black shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-center text-center">
        <div className="flex items-center flex-col">
          <div>
            <h1 className="text-xl font-bold">Sistem Informasi Geografis</h1>
            <p className="text-xs text-black">Pemetaan Bencana Alam Indonesia</p>
          </div>
        </div>
      </div>
    </nav>
  )
}
