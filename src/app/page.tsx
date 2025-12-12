'use client'

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { MapContainer } from '@/components/map/mapContainer'
import { Modal } from '@/components/modal'

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(true)

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: '80px', height: '100vh' }}>
        <MapContainer />
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Sistem Informasi Geografis - Bencana Alam"
      >
        <div>
          <p>
            Aplikasi ini menampilkan data gempa bumi terkini dari BMKG (Badan Meteorologi, 
            Klimatologi, dan Geofisika) secara real-time pada peta interaktif.
          </p>
          <p style={{ marginTop: '15px', fontSize: '12px', color: '#999' }}>
            Aplikasi ini dibuat untuk memenuhi mata kuliah Sistem Informasi Geografis.
          </p>
        </div>
      </Modal>
    </>
  )
}