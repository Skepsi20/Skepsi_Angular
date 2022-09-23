import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  loadingSub: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loadingMap: Map<string, boolean> = new Map<string, boolean>();


  setLoading(loading: boolean, url: string): void {
    console.log('Entre al servicio')
    if (!url) {
      throw new Error('The request URL must be provided to the LoadingService.setLoading function');
    }
    if (loading === true) {
      this.loadingMap.set(url, loading);
      this.loadingSub.next(true);
    }else if (loading === false && this.loadingMap.has(url)) {
      this.loadingMap.delete(url);
    }
    if (this.loadingMap.size === 0) {
      this.loadingSub.next(false);
    }
  }


  isLoading$ = new Subject<boolean>();

  show():void{
    this.isLoading$.next(true);
  }
  hide():void{
    this.isLoading$.next(false);
  }
}
