import { Injectable } from '@angular/core';
import { dmaco, dmacoDinero } from 'src/app/Models/rutinas/LogicoMatematico/Comprension/dmaco.mode';

@Injectable({
  providedIn: 'root'
})
export class Dmaco1012Service {
  public areasYPerimetros: Array<dmaco>;
  public dineroService: Array<dmacoDinero>;
  constructor(){
    this.areasYPerimetros=[
      new dmaco('../assets/img/rutinas/LogicoMatematico/AreasYPerimetros/1012DMACO-01.png', '9','12'),
      new dmaco('../assets/img/rutinas/LogicoMatematico/AreasYPerimetros/1012DMACO-02.png', '9','14'),
      new dmaco('../assets/img/rutinas/LogicoMatematico/AreasYPerimetros/1012DMACO-03.png', '9','16'),
      new dmaco('../assets/img/rutinas/LogicoMatematico/AreasYPerimetros/1012DMACO-04.png', '9','16'),
      new dmaco('../assets/img/rutinas/LogicoMatematico/AreasYPerimetros/1012DMACO-05.png', '9','18'),
      new dmaco('../assets/img/rutinas/LogicoMatematico/AreasYPerimetros/1012DMACO-06.png', '9','20'),
      new dmaco('../assets/img/rutinas/LogicoMatematico/AreasYPerimetros/1012DMACO-07.png', '9','16'),
      new dmaco('../assets/img/rutinas/LogicoMatematico/AreasYPerimetros/1012DMACO-08.png', '9','18'),
      new dmaco('../assets/img/rutinas/LogicoMatematico/AreasYPerimetros/1012DMACO-09.png', '9','26'),
      new dmaco('../assets/img/rutinas/LogicoMatematico/AreasYPerimetros/1012DMACO-10.png', '9','26'),
      new dmaco('../assets/img/rutinas/LogicoMatematico/AreasYPerimetros/1012DMACO-11.png', '9','28'),
      new dmaco('../assets/img/rutinas/LogicoMatematico/AreasYPerimetros/1012DMACO-12.png', '9','20'),
      new dmaco('../assets/img/rutinas/LogicoMatematico/AreasYPerimetros/1012DMACO-13.png', '9','28'),
      new dmaco('../assets/img/rutinas/LogicoMatematico/AreasYPerimetros/1012DMACO-14.png', '9','22'),
      new dmaco('../assets/img/rutinas/LogicoMatematico/AreasYPerimetros/1012DMACO-15.png', '9','14'),
      new dmaco('../assets/img/rutinas/LogicoMatematico/AreasYPerimetros/1012DMACO-16.png', '9','14'),
      new dmaco('../assets/img/rutinas/LogicoMatematico/AreasYPerimetros/1012DMACO-17.png', '9','14'),
      new dmaco('../assets/img/rutinas/LogicoMatematico/AreasYPerimetros/1012DMACO-18.png', '9','16'),
      new dmaco('../assets/img/rutinas/LogicoMatematico/AreasYPerimetros/1012DMACO-19.png', '9','16'),
      new dmaco('../assets/img/rutinas/LogicoMatematico/AreasYPerimetros/1012DMACO-20.png', '9','16'),
      new dmaco('../assets/img/rutinas/LogicoMatematico/AreasYPerimetros/1012DMACO-21.png', '9','18'),
      new dmaco('../assets/img/rutinas/LogicoMatematico/AreasYPerimetros/1012DMACO-22.png', '9','16'),
      new dmaco('../assets/img/rutinas/LogicoMatematico/AreasYPerimetros/1012DMACO-23.png', '9','18'),
      new dmaco('../assets/img/rutinas/LogicoMatematico/AreasYPerimetros/1012DMACO-24.png', '9','18'),
      new dmaco('../assets/img/rutinas/LogicoMatematico/AreasYPerimetros/1012DMACO-25.png', '9','20'),
      new dmaco('../assets/img/rutinas/LogicoMatematico/AreasYPerimetros/1012DMACO-26.png', '9','20'),
      new dmaco('../assets/img/rutinas/LogicoMatematico/AreasYPerimetros/1012DMACO-27.png', '9','20'),
      new dmaco('../assets/img/rutinas/LogicoMatematico/AreasYPerimetros/1012DMACO-28.png', '9','16'),
      new dmaco('../assets/img/rutinas/LogicoMatematico/AreasYPerimetros/1012DMACO-29.png', '9','16'),
      new dmaco('../assets/img/rutinas/LogicoMatematico/AreasYPerimetros/1012DMACO-30.png', '9','16'),
      new dmaco('../assets/img/rutinas/LogicoMatematico/AreasYPerimetros/1012DMACO-31.png', '9','18'),
      new dmaco('../assets/img/rutinas/LogicoMatematico/AreasYPerimetros/1012DMACO-32.png', '9','18'),
      new dmaco('../assets/img/rutinas/LogicoMatematico/AreasYPerimetros/1012DMACO-33.png', '9','18'),
      new dmaco('../assets/img/rutinas/LogicoMatematico/AreasYPerimetros/1012DMACO-34.png', '9','26'),
      new dmaco('../assets/img/rutinas/LogicoMatematico/AreasYPerimetros/1012DMACO-35.png', '9','26'),
      new dmaco('../assets/img/rutinas/LogicoMatematico/AreasYPerimetros/1012DMACO-36.png', '9','26'),
      new dmaco('../assets/img/rutinas/LogicoMatematico/AreasYPerimetros/1012DMACO-37.png', '9','26'),
      new dmaco('../assets/img/rutinas/LogicoMatematico/AreasYPerimetros/1012DMACO-38.png', '9','26'),
      new dmaco('../assets/img/rutinas/LogicoMatematico/AreasYPerimetros/1012DMACO-39.png', '9','26'),
      new dmaco('../assets/img/rutinas/LogicoMatematico/AreasYPerimetros/1012DMACO-40.png', '9','28'),
      new dmaco('../assets/img/rutinas/LogicoMatematico/AreasYPerimetros/1012DMACO-41.png', '9','28'),
      new dmaco('../assets/img/rutinas/LogicoMatematico/AreasYPerimetros/1012DMACO-42.png', '9','28'),
      new dmaco('../assets/img/rutinas/LogicoMatematico/AreasYPerimetros/1012DMACO-43.png', '9','20'),
      new dmaco('../assets/img/rutinas/LogicoMatematico/AreasYPerimetros/1012DMACO-44.png', '9','20'),
      new dmaco('../assets/img/rutinas/LogicoMatematico/AreasYPerimetros/1012DMACO-45.png', '9','20'),
      new dmaco('../assets/img/rutinas/LogicoMatematico/AreasYPerimetros/1012DMACO-46.png', '9','22'),
      new dmaco('../assets/img/rutinas/LogicoMatematico/AreasYPerimetros/1012DMACO-47.png', '9','22'),
      new dmaco('../assets/img/rutinas/LogicoMatematico/AreasYPerimetros/1012DMACO-48.png', '9','22'),
    ];    

    this.dineroService = [
      new dmacoDinero('../assets/img/rutinas/LogicoMatematico/billetesYMonedas/1.png', 1),
      new dmacoDinero('../assets/img/rutinas/LogicoMatematico/billetesYMonedas/5.png', 5),
      new dmacoDinero('../assets/img/rutinas/LogicoMatematico/billetesYMonedas/10.png', 10),
      new dmacoDinero('../assets/img/rutinas/LogicoMatematico/billetesYMonedas/50.png', 50),
      new dmacoDinero('../assets/img/rutinas/LogicoMatematico/billetesYMonedas/100.png', 100)
    ]
  }

  ngonInit(){
  }

  getAreasYPerimetros(){
      return this.areasYPerimetros;
  }

}
