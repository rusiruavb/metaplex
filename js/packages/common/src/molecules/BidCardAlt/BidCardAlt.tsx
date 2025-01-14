import React, { FC } from 'react'
import CN from 'classnames'
import { Image, Button, MetaChip } from '../../atoms'

export interface BidCardAltProps {
  [x: string]: any
  avatar?: string
  avatarLabel?: string
  image?: string
  remainingTime?: string
  price?: string
  dollarValue?: string
  onClickButton?: any
  hasIndicator?: boolean
}

export const BidCardAlt: FC<BidCardAltProps> = ({
  className,
  image,
  remainingTime,
  price,
  dollarValue,
  onClickButton,
  ...restProps
}: BidCardAltProps) => {
  const BidCardAltClasses = CN(
    `bid-card-alt shadow-card flex flex-col bg-white rounded overflow-hidden w-full group cursor-pointer`,
    className
  )

  return (
    <div className={BidCardAltClasses} {...restProps}>
      <div className='flex h-[286px] w-full overflow-hidden'>
        <Image src={image} />
      </div>

      <div className='flex justify-between rounded-b p-[20px] transition-all'>
        <div className='flex flex-col gap-[8px]'>
          <MetaChip overline='Remaining Time' subHeading={remainingTime} />
          <Button appearance='neutral' onClick={onClickButton}>
            Bid Now
          </Button>
        </div>

        <div className='flex'>
          <MetaChip align='right' overline='Starting Bid' subHeading={price} hint={dollarValue} />
        </div>
      </div>
    </div>
  )
}

export default BidCardAlt
