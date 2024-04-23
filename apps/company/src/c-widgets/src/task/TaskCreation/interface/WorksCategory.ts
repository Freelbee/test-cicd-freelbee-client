export interface WorksCategory {
  id: number;
  name: string;
  worksTypes: WorksType[];
}

export interface WorksType {
  id: number;
  name: string;
  attributes: WorksAttribute[];
}

export interface WorksAttribute {
  id: number;
  type: string;
  name: string;
}

const tempWorksAttributes: WorksAttribute[] = [ //TODO::: delete
  {
    id: 111,
    type: 'wa_type_001_11_111',
    name: 'wa_name_001_11_111'
  },
  {
    id: 112,
    type: 'wa_type_001_11_112',
    name: 'wa_name_001_11_112'
  },
  {
    id: 113,
    type: 'wa_type_001_11_113',
    name: 'wa_name_001_11_113'
  },
  {
    id: 121,
    type: 'wa_type_001_12_121',
    name: 'wa_name_001_12_121'
  },
  {
    id: 122,
    type: 'wa_type_001_12_122',
    name: 'wa_name_001_12_122'
  },
  {
    id: 123,
    type: 'wa_type_001_12_123',
    name: 'wa_name_001_12_123'
  },
  {
    id: 131,
    type: 'wa_type_001_13_131',
    name: 'wa_name_001_13_131'
  },
  {
    id: 132,
    type: 'wa_type_001_13_132',
    name: 'wa_name_001_13_132'
  },
  {
    id: 133,
    type: 'wa_type_001_13_133',
    name: 'wa_name_001_13_133'
  },
  {
    id: 211,
    type: 'wa_type_002_21_211',
    name: 'wa_name_002_21_211'
  },
  {
    id: 212,
    type: 'wa_type_002_21_212',
    name: 'wa_name_002_21_212'
  },
  {
    id: 213,
    type: 'wa_type_002_21_213',
    name: 'wa_name_002_21_213'
  },
  {
    id: 221,
    type: 'wa_type_002_22_221',
    name: 'wa_name_002_22_221'
  },
  {
    id: 222,
    type: 'wa_type_002_22_222',
    name: 'wa_name_002_22_222'
  },
  {
    id: 223,
    type: 'wa_type_002_22_223',
    name: 'wa_name_002_22_223'
  },
  {
    id: 231,
    type: 'wa_type_002_23_231',
    name: 'wa_name_002_23_231'
  },
  {
    id: 232,
    type: 'wa_type_002_23_232',
    name: 'wa_name_002_23_232'
  },
  {
    id: 233,
    type: 'wa_type_002_23_233',
    name: 'wa_name_002_23_233'
  },
  {
    id: 311,
    type: 'wa_type_003_31_311',
    name: 'wa_name_003_31_311'
  },
  {
    id: 312,
    type: 'wa_type_003_31_312',
    name: 'wa_name_003_31_312'
  },
  {
    id: 313,
    type: 'wa_type_003_31_313',
    name: 'wa_name_003_31_313'
  },
  {
    id: 321,
    type: 'wa_type_003_32_321',
    name: 'wa_name_003_32_321'
  },
  {
    id: 322,
    type: 'wa_type_003_32_322',
    name: 'wa_name_003_32_322'
  },
  {
    id: 323,
    type: 'wa_type_003_32_323',
    name: 'wa_name_003_32_323'
  },
  {
    id: 331,
    type: 'wa_type_003_33_331',
    name: 'wa_name_003_33_331'
  },
  {
    id: 332,
    type: 'wa_type_003_33_332',
    name: 'wa_name_003_33_332'
  },
  {
    id: 333,
    type: 'wa_type_003_33_333',
    name: 'wa_name_003_33_333'
  }
];

const tempWorksTypes: WorksType[] = [
  {
    id: 11,
    name: 'wt_name_001_11',
    attributes: [
      tempWorksAttributes[0],
      tempWorksAttributes[1],
      tempWorksAttributes[2]
    ]
  },
  {
    id: 12,
    name: 'wt_name_001_12',
    attributes: [
      tempWorksAttributes[4],
      tempWorksAttributes[5],
      tempWorksAttributes[6]
    ]
  },
  {
    id: 13,
    name: 'wt_name_001_13',
    attributes: [
      tempWorksAttributes[7],
      tempWorksAttributes[8],
      tempWorksAttributes[9]
    ]
  },
  {
    id: 21,
    name: 'wt_name_002_21',
    attributes: [
      tempWorksAttributes[10],
      tempWorksAttributes[11],
      tempWorksAttributes[12]
    ]
  },
  {
    id: 22,
    name: 'wt_name_002_22',
    attributes: [
      tempWorksAttributes[13],
      tempWorksAttributes[14],
      tempWorksAttributes[15]
    ]
  },
  {
    id: 23,
    name: 'wt_name_002_23',
    attributes: [
      tempWorksAttributes[16],
      tempWorksAttributes[17],
      tempWorksAttributes[18]
    ]
  },
  {
    id: 31,
    name: 'wt_name_003_31',
    attributes: [
      tempWorksAttributes[19],
      tempWorksAttributes[20],
      tempWorksAttributes[21]
    ]
  },
  {
    id: 32,
    name: 'wt_name_003_32',
    attributes: [
      tempWorksAttributes[22],
      tempWorksAttributes[23],
      tempWorksAttributes[24]
    ]
  },
  {
    id: 33,
    name: 'wt_name_003_33',
    attributes: [
      tempWorksAttributes[25],
      tempWorksAttributes[26],
      tempWorksAttributes[27]
    ]
  }
];

export const tempWorksCategories: WorksCategory[] = [
  {
    id: 1,
    name: 'wc_name_001',
    worksTypes: [
      tempWorksTypes[0],
      tempWorksTypes[1],
      tempWorksTypes[2]
    ]
  },
  {
    id: 2,
    name: 'wc_name_002',
    worksTypes: [
      tempWorksTypes[3],
      tempWorksTypes[4],
      tempWorksTypes[5]
    ]
  },
  {
    id: 3,
    name: 'wc_name_003',
    worksTypes: [
      tempWorksTypes[6],
      tempWorksTypes[7],
      tempWorksTypes[8]
    ]
  }
];
