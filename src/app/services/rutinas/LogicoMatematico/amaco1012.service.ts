import { Injectable } from '@angular/core';
import { AMACO } from 'src/app/Models/rutinas/LogicoMatematico/Comprension/amaco.model';

@Injectable({
  providedIn: 'root'
})
export class Amaco1012Service {

  public operaciones:Array<AMACO>;
  public figGeo: Array<AMACO>;
  public espaciosFig : Array<AMACO>;
  public fracciones: Array<AMACO>;


  constructor(){
    this.operaciones=[
      new AMACO ('2+1', '3','','','','',''),
      new AMACO ('2+2', '4','','','','',''),
      new AMACO ('9-1', '8','','','','',''),
      new AMACO ('9-5', '4','','','','',''),
      new AMACO ('3 x 3', '9','','','','',''),
      new AMACO ('2 x 2', '4','','','','',''),
      new AMACO ('9 / 3', '3','','','','','')
    ];

    this.figGeo = [
      new AMACO('','','','01','02','',''),
      new AMACO('','','','02','09','',''),
      new AMACO('','','','03','09','',''),
      new AMACO('','','','04','16','',''),
      new AMACO('','','','05','09','',''),
      new AMACO('','','','06','08','',''),
      new AMACO('','','','07','07','',''),
      new AMACO('','','','08','05','',''),
      new AMACO('','','','09','03','',''),
      new AMACO('','','','10','17','',''),
      new AMACO('','','','11','17','',''),
      new AMACO('','','','12','03','',''),
      new AMACO('','','','13','07','',''),
      new AMACO('','','','14','03','',''),
    ]

    this.espaciosFig=[
      new AMACO("","","","01", "", "",""),
      new AMACO("","","","02", "", "",""),
      new AMACO("","","","02", "", "",""),
      new AMACO("","","","04", "", "",""),
      new AMACO("","","","05", "", "",""),
      new AMACO("","","","06", "", "",""),
      new AMACO("","","","07", "", "",""),
      new AMACO("","","","08", "", "",""),
      new AMACO("","","","09", "", "",""),
      new AMACO("","","","10", "", "",""),
      new AMACO("","","","11", "", "",""),
      new AMACO("","","","12", "", "",""),
      new AMACO("","","","13", "", "",""),
      new AMACO("","","","14", "", "",""),
      new AMACO("","","","15", "", "",""),
      new AMACO("","","","16", "", "",""),
      new AMACO("","","","17", "", "",""),
      new AMACO("","","","18", "", "",""),
      new AMACO("","","","19", "", "",""),
    ]

    this.fracciones=[
      new AMACO('','','','','','01','1/4'),
      new AMACO('','','','','','02','2/4'),
      new AMACO('','','','','','03','3/4'),
      new AMACO('','','','','','04','4/4'),
      new AMACO('','','','','','05','1/5'),
      new AMACO('','','','','','06','2/5'),
      new AMACO('','','','','','07','3/5'),
      new AMACO('','','','','','08','4/5'),
      new AMACO('','','','','','09','5/5'),
      new AMACO('','','','','','10','1/6'),
      new AMACO('','','','','','11','2/6'),
      new AMACO('','','','','','12','3/6'),
      new AMACO('','','','','','13','4/6'),
      new AMACO('','','','','','14','5/6'),
      new AMACO('','','','','','15','6/6'),
      new AMACO('','','','','','16','1/7'),
      new AMACO('','','','','','17','2/7'),
      new AMACO('','','','','','18','3/7'),
      new AMACO('','','','','','19','4/7'),
      new AMACO('','','','','','20','5/7'),
      new AMACO('','','','','','21','6/7'),
      new AMACO('','','','','','22','7/7'),
      new AMACO('','','','','','23','1/8'),
      new AMACO('','','','','','24','2/8'),
      new AMACO('','','','','','25','3/8'),
      new AMACO('','','','','','26','4/8'),
      new AMACO('','','','','','27','5/8'),
      new AMACO('','','','','','28','6/8'),
      new AMACO('','','','','','29','7/8'),
      new AMACO('','','','','','30','8/8'),
      new AMACO('','','','','','31','1/9'),
      new AMACO('','','','','','32','2/9'),
      new AMACO('','','','','','33','3/9'),
      new AMACO('','','','','','34','4/9'),
      new AMACO('','','','','','35','5/9'),
      new AMACO('','','','','','36','6/9'),
      new AMACO('','','','','','37','7/9'),
      new AMACO('','','','','','38','8/9'),
      new AMACO('','','','','','39','9/9'),
      new AMACO('','','','','','40','1/10'),
      new AMACO('','','','','','41','2/10'),
      new AMACO('','','','','','42','3/10'),
      new AMACO('','','','','','43','4/10'),
      new AMACO('','','','','','44','5/10'),
      new AMACO('','','','','','45','6/10'),
      new AMACO('','','','','','46','7/10'),
      new AMACO('','','','','','47','8/10'),
      new AMACO('','','','','','48','9/10'),
      new AMACO('','','','','','49','10/10'),

    ]


  }



  ngonInit(){
    //on Init
  }

  getOperaciones(){
      return this.operaciones;
  }

  getFigGeo(){
    return this.figGeo;
  }
  getEspaciosFig(){
    return this.espaciosFig;
  }

  getFracciones(){
    return this.fracciones;
  }

}
