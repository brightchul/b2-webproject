export type JsonData = {
  "1": Record<string, string>; // '0': 'Coolio',
  year: Record<string, number>; // '1': 2022,
  month: Record<string, number>; //  '1': 9,
  level_2: Record<string, number>; //  '1': 0,
  contries_share: Record<string, string>; // '0': 'DE,IT,US,UK,NL,AUS',
};

export type JsonDataKey = keyof JsonData;
export type OneRow = JsonData[JsonDataKey];
