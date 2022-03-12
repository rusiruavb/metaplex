import React, { FC, useCallback, useEffect, useState } from 'react'
import CN from 'classnames'
import { Chip } from '../../atoms/Chip'
import { TextField } from '../../atoms/TextField'
import { Dropdown, DropDownBody, DropDownToggle, DropDownMenuItem } from '../../atoms/Dropdown'
import { ArtCard } from '../../molecules/ArtCard'
import { Modal } from '../../molecules/Modal'
import { ArtDetails } from '../../molecules/ArtDetails'
import { QuickBuy } from '../../sections/QuickBuy'

import { Link } from 'react-router-dom'
import { useExtendedCollection } from '../../../hooks'
import { cache, fromLamports, MintParser, PriceFloorType, useConnection } from '@oyster/common'
import { BN } from 'bn.js'
import { PublicKey } from '@solana/web3.js'

export interface CollectionItemsProps {
  [x: string]: any
}

export function useMintD() {
  const connection = useConnection()

  const getMintData = (key: string | PublicKey) => {
    const id = typeof key === 'string' ? key : key?.toBase58()
    return cache.query(connection, id, MintParser)
  }

  return getMintData
}

const SORT_LOW_TO_HIGH = 'Price: Low to High'
const SORT_HIGH_TO_LOW = 'Price: High to Low'

export const CollectionItems: FC<CollectionItemsProps> = ({
  dataItems,
  className,
  ...restProps
}: CollectionItemsProps) => {
  const CollectionItemsClasses = CN(`collection-items w-full`, className)
  const [showQuickBuyModal, setShowQuickBuyModal] = useState<boolean>(false)
  const [showArtModalModal, setShowArtModalModal] = useState<boolean>(false)
  const [selectedArt, setSelectedArt] = useState<any>(null)

  const [nftItems, setNftItems] = useState([])

  const getMintData = useMintD()

  useEffect(() => {
    setNftItems(() => dataItems.map(bindAmount))
  }, [dataItems])

  const bindAmount = auctionView => {
    const dx = getMintData(auctionView[0].auction.info.tokenMint)
    const participationFixedPrice =
      auctionView[0].auctionManager.participationConfig?.fixedPrice || 0
    const participationOnly = auctionView[0].auctionManager.numWinners.eq(new BN(0))
    const priceFloor =
      auctionView[0].auction.info.priceFloor.type === PriceFloorType.Minimum
        ? auctionView[0].auction.info.priceFloor.minPrice?.toNumber() || 0
        : 0
    const amount = fromLamports(participationOnly ? participationFixedPrice : priceFloor, dx.info)
    return { ...auctionView, amount }
  }

  const shortByPrice = val => {
    const dataArray = nftItems.sort(function (a: any, b: any) {
      return val === SORT_LOW_TO_HIGH ? a.amount - b.amount : b.amount - a.amount
    })
    setNftItems([])
    setTimeout(() => {
      setNftItems(() => [...dataArray])
    }, 1000)
  }

  return (
    <div className={CollectionItemsClasses} {...restProps}>
      <div className='flex flex-wrap gap-[8px] pt-[16px] pb-[16px] md:py-[32px]'>
        <Chip onClose={() => {}}>Buy Now</Chip>
        <Chip onClose={() => {}} label='Character'>
          Foxy belugie
        </Chip>
        <Chip onClose={() => {}} label='Price range'>
          ◎ .05 - ◎ .10
        </Chip>
        <Chip onClose={() => {}} label='Face'>
          Happy
        </Chip>
        <Chip onClose={() => {}} label='Shirt'>
          Beach
        </Chip>
        <Chip onClose={() => {}} label='Tier'>
          Professional
        </Chip>

        <button className='h-[32px] appearance-none rounded-full px-[8px] text-md font-500 text-B-400'>
          Clear all
        </button>
      </div>

      <div className='flex flex-col gap-[12px] md:flex-row md:gap-[20px]'>
        <TextField
          iconBefore={<i className='ri-search-2-line' />}
          placeholder='Search for traits, tags, item #s, and more...'
          size='sm'
        />

        <Dropdown className='w-full md:w-[260px]'>
          {({ isOpen, setIsOpen, setInnerValue, innerValue }: any) => {
            const onSelectOption = (value: string) => {
              setIsOpen(false)
              setInnerValue(value)
              if (value === SORT_HIGH_TO_LOW || value === SORT_LOW_TO_HIGH) {
                shortByPrice(value)
              }
            }

            const options = [
              { label: 'Art: A to Z', value: 'Art: A to Z' },
              { label: 'Art: Z to A', value: 'Art: Z to A' },
              {
                label: SORT_LOW_TO_HIGH,
                value: SORT_LOW_TO_HIGH,
              },
              {
                label: SORT_HIGH_TO_LOW,
                value: SORT_HIGH_TO_LOW,
              },
            ]

            return (
              <>
                <DropDownToggle onClick={() => setIsOpen(!isOpen)}>
                  <TextField
                    iconAfter={
                      isOpen ? (
                        <i className='ri-arrow-up-s-line' />
                      ) : (
                        <i className='ri-arrow-down-s-line' />
                      )
                    }
                    value={innerValue || 'Price: Low to High'}
                    readOnly
                    size='sm'
                  />
                </DropDownToggle>

                {isOpen && (
                  <DropDownBody
                    align='right'
                    className='mt-[8px] w-full border border-B-10 shadow-lg shadow-B-700/10'>
                    {options?.map((option: any, index: number) => {
                      const { label, value } = option

                      return (
                        <DropDownMenuItem
                          key={index}
                          onClick={() => onSelectOption(value)}
                          {...option}>
                          {label}
                        </DropDownMenuItem>
                      )
                    })}
                  </DropDownBody>
                )}
              </>
            )
          }}
        </Dropdown>
      </div>

      <div className='grid grid-cols-2 gap-[16px] pt-[32px] md:grid-cols-3 md:gap-[28px] lg:grid-cols-4'>
        {nftItems.map((art: any, index: number) => {
          // console.log('art', art[0])

          // if (art[0].state == '0') {
          return (
            <Link key={index} to={`/auction/${art[0].auction.pubkey}`}>
              <ArtCard
                // onClickBuy={() => {
                //   setSelectedArt(art)
                //   setShowQuickBuyModal(true)
                // }}
                // onClickDetails={() => {
                //   setSelectedArt(art)
                //   setShowArtModalModal(true)
                // }}

                pubkey={art[0].thumbnail.metadata.pubkey}
                auction={art[0]}
              />
            </Link>
          )
          // }
        })}
      </div>

      {showQuickBuyModal && (
        <Modal heading='Complete order' onClose={() => setShowQuickBuyModal(false)}>
          {({ modalClose }: any) => {
            return (
              <>
                <QuickBuy
                  onSubmit={(e: any) => {
                    modalClose(e)
                    setShowQuickBuyModal(false)
                  }}
                  art={selectedArt}
                />
              </>
            )
          }}
        </Modal>
      )}

      {showArtModalModal && (
        <Modal onClose={() => setShowArtModalModal(false)} size='lg' isFixed={false}>
          {({ modalClose }: any) => {
            return (
              <>
                <ArtDetails
                  onSubmit={(e: any) => {
                    modalClose(e)
                    setShowArtModalModal(false)
                  }}
                  art={selectedArt}
                />
              </>
            )
          }}
        </Modal>
      )}
    </div>
  )
}

export default CollectionItems
