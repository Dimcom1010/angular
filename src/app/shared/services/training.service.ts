import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';

import { FilterSearchAll, ResponseData, TrainingChapterResReq, TrainingResReq } from '@shared/models';
import { environment } from '@env';

@Injectable({ providedIn: 'root' })
export class TrainingService {
  private readonly http = inject(HttpClient);

  getChapter(id: number): Observable<TrainingChapterResReq> {
    return this.http.get<TrainingChapterResReq>(`${environment.serverUrl}training/chapter/${id}`);
  }
  async saveChapter(req: TrainingChapterResReq): Promise<TrainingChapterResReq> {
    return await firstValueFrom(this.http.put<TrainingChapterResReq>(`${environment.serverUrl}training/chapter`, req));
  }
  existChapter(name: string, id: number = 0): Observable<boolean> {
    return this.http.get<boolean>(`${environment.serverUrl}training/chapter/exist?name=${name}&id=${id}`);
  }
  async deleteChapter(id: number): Promise<void> {
    return await firstValueFrom(this.http.delete<void>(`${environment.serverUrl}training/chapter/${id}`));
  }
  getChapters(req: FilterSearchAll): Observable<ResponseData<TrainingChapterResReq>> {
    return this.http.post<ResponseData<TrainingChapterResReq>>(`${environment.serverUrl}training/chapter`, req);
  }

  getTest(id: number): Observable<TrainingResReq> {
    return this.http.get<TrainingResReq>(`${environment.serverUrl}training/${id}`);
  }
  async saveTest(req: TrainingResReq): Promise<TrainingResReq> {
    return await firstValueFrom(this.http.put<TrainingResReq>(`${environment.serverUrl}training`, req));
  }
  existTest(name: string, id: number = 0): Observable<boolean> {
    return this.http.get<boolean>(`${environment.serverUrl}training/exist?name=${name}&id=${id}`);
  }
  async deleteTest(id: number): Promise<void> {
    return await firstValueFrom(this.http.delete<void>(`${environment.serverUrl}training/${id}`));
  }
  getTests(req: FilterSearchAll): Observable<ResponseData<TrainingResReq>> {
    return this.http.post<ResponseData<TrainingResReq>>(`${environment.serverUrl}training`, req);
  }
}
