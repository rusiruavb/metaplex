import React, { useCallback, useMemo, useState } from 'react'
import { Row, Col } from 'antd'

import RedeemModal from './components/RedeemModal'
import PackSidebar from './components/PackSidebar'
import ArtCard from './components/ArtCard'
import { PackProvider, usePack } from './contexts/PackContext'

const PackView: React.FC = () => {
  const [openModal, setOpenModal] = useState(false)
  const { provingProcess, pack } = usePack()

  const cardsRedeemed = provingProcess?.info.cardsRedeemed || 0
  const packSize = pack?.info.allowedAmountToRedeem || 0
  const cards = useMemo(
    () => Array.from({ length: packSize }, (_, i) => i),
    [packSize, cardsRedeemed]
  )

  const handleToggleModal = useCallback(async () => {
    setOpenModal(!openModal)
  }, [openModal])

  return (
    <div className='pack-view'>
      <Row>
        <Col md={16}>
          <div className='pack-view__list'>
            {cards.map(index => (
              <ArtCard key={index} index={index} isModalOpened={openModal} />
            ))}
          </div>
        </Col>
        <Col md={8} className='pack-view__sidebar-container'>
          <PackSidebar onOpenPack={handleToggleModal} />
        </Col>
      </Row>

      <RedeemModal isModalVisible={openModal} onClose={handleToggleModal} />
    </div>
  )
}

const PackViewWithContext: React.FC = () => (
  <PackProvider>
    <PackView />
  </PackProvider>
)

export default PackViewWithContext
