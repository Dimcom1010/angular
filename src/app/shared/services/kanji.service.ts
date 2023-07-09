import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';

import { FilterSearchAll, KanjiReqRes, RadicalResReq, ResponseData } from '@shared/models';
import { environment } from '@env';

@Injectable({ providedIn: 'root' })
export class KanjiService {
  private readonly http = inject(HttpClient);

  public getCountKanji() {
    return this.http.get<number>(`${environment.serverUrl}kanji/count`);
  }
  public getCountRadicals() {
    return this.http.get<number>(`${environment.serverUrl}kanji/radical/count`);
  }

  getRadical(id: number): Observable<RadicalResReq> {
    return this.http.get<RadicalResReq>(`${environment.serverUrl}kanji/radical/${id}`);
  }
  async saveRadical(req: RadicalResReq): Promise<RadicalResReq> {
    return await firstValueFrom(this.http.put<RadicalResReq>(`${environment.serverUrl}kanji/radical`, req));
  }
  existRadical(name: string, id: number = 0): Observable<boolean> {
    return this.http.get<boolean>(`${environment.serverUrl}kanji/radical/exist?name=${name}&id=${id}`);
  }
  async deleteRadical(id: number): Promise<void> {
    return await firstValueFrom(this.http.delete<void>(`${environment.serverUrl}kanji/radical/${id}`));
  }
  getRadicals(req: FilterSearchAll): Observable<ResponseData<RadicalResReq>> {
    return this.http.post<ResponseData<RadicalResReq>>(`${environment.serverUrl}kanji/radical`, req);
  }

  getKanji(id: number): Observable<KanjiReqRes> {
    return this.http.get<KanjiReqRes>(`${environment.serverUrl}kanji/${id}`);
  }
  async saveKanji(req: KanjiReqRes): Promise<KanjiReqRes> {
    return await firstValueFrom(this.http.put<KanjiReqRes>(`${environment.serverUrl}kanji`, req));
  }
  existKanji(name: string, id: number = 0): Observable<boolean> {
    return this.http.get<boolean>(`${environment.serverUrl}kanji/exist?name=${name}&id=${id}`);
  }
  async deleteKanji(id: number): Promise<void> {
    return await firstValueFrom(this.http.delete<void>(`${environment.serverUrl}kanji/${id}`));
  }
  getKanjis(req: FilterSearchAll): Observable<ResponseData<KanjiReqRes>> {
    return this.http.post<ResponseData<KanjiReqRes>>(`${environment.serverUrl}kanji`, req);
  }
}
