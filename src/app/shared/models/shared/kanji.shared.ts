import { JlptReq, JoyoReq, WanikaniReq } from './constant.shared';
import { RadicalResReq } from './radical.shared';

export type KanjiReqRes = {
  id?: number;
  kanji: string;
  description: string;
  count_traits: number;
  kun_readings: string[];
  on_readings: string[];
  nanori_readings: string[];
  values: string[];
  jlpt?: JlptReq;
  wanikani?: WanikaniReq;
  joyo?: JoyoReq;
  radicals?: RadicalResReq[];

  on_emi_reading: string;
  kun_emi_reading: string;
  special_reading: string;

  kanji_read?: KanjiReadReqRes[];
};

export type KanjiReadReqRes = {
  id?: number;
  kanjiId?: number;
  text: string;
  furigana: string;
  romaji: string;
  rus: string;
};
