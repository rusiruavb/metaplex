const palette = {
  B: {
    paletteName: 'Brand',
    base: '#0085ff',
    darkest: '#00305c',
    10: '#f5faff',
    50: '#cce7ff',
    100: '#a3d3ff',
    200: '#7ac0ff',
    300: '#52acff',
    400: '#0085ff',
    500: '#0070d6',
    600: '#005aad',
    700: '#004585',
    800: '#00305c',
  },
  Y: {
    paletteName: 'Yellow',
    base: '#FFE440',
    darkest: '#FFD60A',
    10: '#FFF9DC',
    50: '#FFF6B4',
    100: '#FFF29A',
    200: '#FFEF81',
    300: '#FFEC6A',
    400: '#FFE854',
    500: '#FFE440',
    600: '#FFDF2D',
    700: '#FFDB1B',
    800: '#FFD60A',
  },
  N: {
    paletteName: 'Neutral',
    base: '#273040',
    darkest: '#040D1F',
    10: '#F8FBFD',
    50: '#F4F7FA',
    100: '#E5EDF4',
    200: '#D8E1EC',
    300: '#C2D0DE',
    400: '#A1AFC1',
    500: '#728197',
    600: '#4B5669',
    700: '#273040',
    800: '#040D1F',
  },
  R: {
    paletteName: 'Red',
    base: '#F6475B',
    darkest: '#EF233C',
    10: '#FFF2F2',
    50: '#FEE7E9',
    100: '#FDCFD4',
    200: '#FBA2AC',
    300: '#FA7C8A',
    400: '#F85E6F',
    500: '#F6475B',
    600: '#F4364D',
    700: '#F22B43',
    800: '#EF233C',
  },
  G: {
    paletteName: 'Green',
    base: '#07D851',
    darkest: '#00453F',
    10: '#E6FCEE',
    50: '#B3F6CB',
    100: '#B3F6CB',
    200: '#67EC97',
    300: '#4EE985',
    400: '#2BF171',
    500: '#07D851',
    600: '#007653',
    700: '#005F4C',
    800: '#00453F',
  },
  P: {
    paletteName: 'Purple',
    base: '#4219e2',
    darkest: '#17094f',
    10: '#f5f2fe',
    50: '#d6cdfa',
    100: '#b8a9f5',
    200: '#9a84f1',
    300: '#7c5fed',
    400: '#4219e2',
    500: '#3715bd',
    600: '#2d1199',
    700: '#220d74',
    800: '#17094f',
  },
  white: '#fff',
  black: '#000',
}

module.exports = {
  palette: { ...palette },
  brand: { B: palette.B },
  contrast: { dark: palette.N.darkest, light: palette.white },
  primary: { B: palette.B.base, N: palette.N.base },
}
