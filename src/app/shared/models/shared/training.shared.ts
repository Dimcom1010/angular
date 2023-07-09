import { KanjiReqRes } from './kanji.shared';
import { TrainingChapterResReq } from './training-chapter.shared';

export type TrainingResReq = {
  id?: number;
  name: string;
  count: number;
  chapter: TrainingChapterResReq;
  list_kanji: KanjiReqRes[];
};
