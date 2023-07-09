import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { JlptReq, JoyoReq, WanikaniReq } from '@shared/models';
import { environment } from '@env';

@Injectable({ providedIn: 'root' })
export class ConstantService {
  private readonly http = inject(HttpClient);

  public readonly jlpt = signal<JlptReq[]>([]);
  public readonly wanikani = signal<WanikaniReq[]>([]);
  public readonly joyo = signal<JoyoReq[]>([]);

  async loadHandbooks() {
    await Promise.all([this.loadJlpt(), this.loadWanikani(), this.loadJoyo()]);
  }

  async loadJlpt() {
    if (!this.jlpt()?.length) {
      this.jlpt.set(await firstValueFrom(this.http.get<JlptReq[]>(`${environment.serverUrl}constant/jlpt`)));
    }
  }
  async loadWanikani() {
    if (!this.wanikani()?.length) {
      this.wanikani.set(
        await firstValueFrom(this.http.get<WanikaniReq[]>(`${environment.serverUrl}constant/wanikani`)),
      );
    }
  }
  async loadJoyo() {
    if (!this.joyo()?.length) {
      this.joyo.set(await firstValueFrom(this.http.get<JoyoReq[]>(`${environment.serverUrl}constant/joyo`)));
    }
  }
}
