import { WanikaniReq } from './constant.shared';

export type RadicalResReq = {
  id?: number;
  kanji: string;
  count_traits: number;
  readings: string[];
  values: string[];
  description: string;
  nanori_readings: string[];
  wanikani?: WanikaniReq;
  variants?: RadicalResReq[];
};
