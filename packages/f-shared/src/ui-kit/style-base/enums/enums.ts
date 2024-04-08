export enum Breakpoint {
  'sMobile' = 320,
  'xMobile' = 600,
  'Tablet' = 768,
  'xTablet' = 960,
  'Medium' = 1024,
  'xMedium' = 1280,
  'Large' = 1440,
  'xLarge' = 1600,
  'FHD' = 1920
}

export enum Color {
  //Grayscale:
  WHITE = '#ffffff',
  GRAY_100 = '#FAFAFA',
  GRAY_200 = '#F7F7FC',
  GRAY_300 = '#EFF0F6',
  GRAY_400 = '#D7DBEB',
  GRAY_500 = '#B3B7C7',
  GRAY_600 = '#737A92',
  GRAY_700 = '#4E4B66',
  GRAY_800 = '#282C38',
  GRAY_900 = '#1C1C1C',

  //Solid:
  DANGER = '#df2323',
  YELLOW = '#FFC226',
  EMERALD = '#3DE297',
  MINT = '#7EF0BC',
  GREEN = '#2AB408',
  SWAMPY = '#0CAF60',
  NDA = '#188B5B',
  DEFAULT_BLUE = '#7696E7',
  NEW = '#25A7D0',
  PEN_BLUE = '#04103D',

  //Status:
  ERROR = '#FD6A6A',
  CHECKING = '#FF6B00',
  PROCESSING = '#D89B00',
  PAID = '#30D42C',
  BLUE = '#0D76E9',
  PLAN = '#6A25AE',

  //Backgroud:
  BG_RED = '#FFEFED',
  BG_ORANGE = '#FFF3EC',
  BG_YELLOW = '#FFFFEA',
  BG_SWAMPY = '#E7F7EF',
  BG_MINT = '#E8FFF4',
  BG_BLUE = '#EBF4FA',
  BG_REPORTS_BLUE = '#F1F5FF',
  BG_LIGHT_BLUE = '#F2F9FB',
  BG_LIGHT_PURPLE = '#FAF0FF',

  //Gradient:
  GRADIENT_IP = 'linear-gradient(341deg, #0D5A7B 0%, #2D74DF 100%)',
  GRADIENT_CYAN = 'linear-gradient(135deg, #59F0DE 0%, #093248 100%)',
  GRADIENT_GREENBLUE = 'linear-gradient(165deg, #3DE297 2.5%, #0D76E9 109.38%)',
  
  VIOLET = '#7B61FF',
  VIOLET_TRANSPARENT = 'rgb(229 221 248 / 30%)',

  
}

export enum Z_INDEX {
  'header' = 9,
  'navigationMenu' = 8,
  'modal' = 10,
  'popupErrors' = 11,
  'globalLoader' = 1000,
}

export enum BORDER_RADIUS {
  'XXS' = '2px',
  'S' = '8px',
  'M' = '14px',
  'L' = '24px',
}