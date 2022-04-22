import React from 'react'

export const QuoteIcon = ({ size = 28, color = 'currentColor', ...restProps }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 80 80'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...restProps}>
      <path
        d='M15.2767 57.7367C11.8433 54.09 10 50 10 43.37C10 31.7033 18.19 21.2467 30.1 16.0767L33.0767 20.67C21.96 26.6833 19.7867 34.4867 18.92 39.4067C20.71 38.48 23.0533 38.1567 25.35 38.37C31.3633 38.9267 36.1033 43.8633 36.1033 50C36.1033 53.0942 34.8742 56.0616 32.6862 58.2496C30.4983 60.4375 27.5309 61.6667 24.4367 61.6667C20.86 61.6667 17.44 60.0333 15.2767 57.7367ZM48.61 57.7367C45.1767 54.09 43.3333 50 43.3333 43.37C43.3333 31.7033 51.5233 21.2467 63.4333 16.0767L66.41 20.67C55.2933 26.6833 53.12 34.4867 52.2533 39.4067C54.0433 38.48 56.3867 38.1567 58.6833 38.37C64.6967 38.9267 69.4367 43.8633 69.4367 50C69.4367 53.0942 68.2075 56.0616 66.0196 58.2496C63.8316 60.4375 60.8642 61.6667 57.77 61.6667C54.1933 61.6667 50.7733 60.0333 48.61 57.7367Z'
        fill={color}
      />
    </svg>
  )
}

export default QuoteIcon