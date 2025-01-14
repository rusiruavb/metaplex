import React, { FC, useEffect, useState } from 'react'
import CN from 'classnames'
import { AttributesCard } from '@oyster/common'
import { Image, Avatar, SOLIcon } from '@oyster/common'
import { NFTDetailsTabs } from './../NFTDetailsTabs'
import { AuctionView, useExtendedArt } from '../../../hooks'
import { useCollections } from '../../../hooks/useCollections'
import useNFTData from '../../../hooks/useNFTData'
import { AuctionCard } from '../../../components/AuctionCard'
import useAttribute from '../../../hooks/useAttribute'
import { Link } from 'react-router-dom'

export interface NFTDetailsBodyProps {
  className: string
  auction: AuctionView
}

export const NFTDetailsBody: FC<NFTDetailsBodyProps> = ({ className, auction }) => {
  const { data } = useExtendedArt(auction?.thumbnail.metadata.pubkey)
  const { liveCollections } = useCollections()
  const [owner, setOwner] = useState<string>()
  const { attributesPercentages } = useAttribute(auction)
  const pubkey = liveCollections.find(({ mint }) => mint === data?.collection)?.pubkey || undefined
  const { data: collection } = useExtendedArt(pubkey)

  const {
    value: { solVal, usdValFormatted },
  } = useNFTData(auction)
  const url = data?.image

  useEffect(() => {
    setOwner(auction?.auctionManager?.authority || '')
  }, [])

  const NFTDetailsBodyClasses = CN(`nft-details-body w-full`, className)

  return (
    <div className={NFTDetailsBodyClasses}>
      <div className='container flex gap-[40px] rounded border border-slate-200 bg-white p-[40px] shadow-card-light'>
        <div className='sidebar flex w-[400px] flex-shrink-0 flex-col gap-[40px]'>
          <span className='w-full overflow-hidden rounded-[8px]'>
            <Image src={url} />
          </span>

          <div className='flex flex-col gap-[16px]'>
            <h5 className='text-h5 font-500'>Description</h5>
            <p className='text-md text-slate-600'>{data?.description}</p>
          </div>

          {!!data?.attributes?.length && (
            <div className='flex flex-col gap-[16px]'>
              <h5 className='text-h5 font-500'>Attributes</h5>

              <div className='flex w-full flex-col gap-[8px]'>
                {(data?.attributes || []).map(
                  ({ trait_type: label, value }: any, index: number) => {
                    const tagVal =
                      attributesPercentages.find(
                        p => p.trait_type === label && p.value === value
                      ) || null
                    return (
                      <AttributesCard
                        key={`${index}-${label}`}
                        overline={label}
                        label={value}
                        tag={tagVal ? `🔥 ${tagVal?.percentage.toFixed(2)}%` : ''}
                        hasHoverEffect={false}
                        className='cursor-auto !py-[12px] !px-[16px]'
                      />
                    )
                  }
                )}
              </div>
            </div>
          )}
        </div>

        <div className='content flex w-full flex-col'>
          <div className='flex flex-col gap-[28px]'>
            <div className='flex flex-col gap-[16px]'>
              <div className='flex flex-col gap-[4px]'>
                <h2 className='text-h2 font-500 text-slate-800'>{data?.name}</h2>
                {collection?.name && (
                  <div className='flex items-center gap-[4px]'>
                    <h6 className='text-h6 font-400'>
                      {
                        //@ts-ignore
                        collection?.name ?? data?.collection?.name
                      }
                    </h6>
                    <i className='ri-checkbox-circle-fill text-[24px] text-green-400' />
                  </div>
                )}
                {
                  //@ts-ignore
                  data?.collection?.name && (
                    <div className='flex items-center gap-[4px]'>
                      <h6 className='text-h6 font-400'>
                        {
                          //@ts-ignore
                          data?.collection?.name
                        }
                      </h6>
                      <i className='ri-checkbox-circle-fill text-[24px] text-green-400' />
                    </div>
                  )
                }
              </div>

              <div className='text-sm font-500 text-B-400'>
                <Link to={`/profile/${owner}`}>
                  <Avatar
                    key={owner}
                    address={owner}
                    label={`Owned by — ${owner?.substring(0, 3)}...${owner?.substring(
                      owner.length - 3
                    )}`}
                    size={32}
                    labelClassName='text-sm font-500 text-B-400'
                  />
                </Link>
              </div>
            </div>

            <div className='flex flex-col gap-[12px]'>
              <h5 className='text-h6 font-400'>Current price</h5>
              <div className='flex items-center gap-[8px]'>
                <SOLIcon size={24} />
                <h4 className='text-h4 font-600 leading-[1]'>{solVal} SOL</h4>
                <span className='ml-[4px] text-lg text-slate-500'>{usdValFormatted}</span>
              </div>
            </div>

            {auction && <AuctionCard auctionView={auction} hideDefaultAction={false} />}

            <NFTDetailsTabs auction={auction} />
          </div>
        </div>
      </div>
    </div>
  )
}
