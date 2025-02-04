import React, { FC } from 'react'
import CN from 'classnames'
import { MetaChip } from '../../atoms/MetaChip'

export interface StatsCardProps {
  [x: string]: any
  stats?: any[]
}

export const StatsCard: FC<StatsCardProps> = ({
  numberOfItems,
  className,
  ...restProps
}: StatsCardProps) => {
  const StatsCardClasses = CN(
    `stats-card shadow-card bg-white p-[20px] rounded h-[100px] flex items-center w-full justify-between gap-[32px]`,
    className
  )

  return (
    <div className={StatsCardClasses} {...restProps}>
      <MetaChip className='w-full' align='center' description='Items' heading={numberOfItems} />
      <span className='flex h-[60px] w-[1px] bg-slate-200' />
      <MetaChip className='w-full' align='center' description='Owners' heading='3.8K' />
      <span className='flex h-[60px] w-[1px] bg-slate-200' />
      <MetaChip className='w-full' align='center' description='Floor price' heading='0.35' />
      <span className='flex h-[60px] w-[1px] bg-slate-200' />
      <MetaChip className='w-full' align='center' description='Volume' heading='100K' />
    </div>
  )
}

StatsCard.defaultProps = {}

export default StatsCard
