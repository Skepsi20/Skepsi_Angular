import { Component, Input, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Iroutine, studentSessionsWithResults,resultsWithDate } from 'src/app/Models/Resultados/sessionsResults';
import { ResultsService } from 'src/app/services/Resultados/results.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit{
  score: any=[];
  level: any=[];
  @Input() routineId: string ='';

  public routinesWithResults: Iroutine[] | undefined;
  public studentSessionsWithResults: Array<studentSessionsWithResults> = [];
  public resultadosTabla: any;
  public dateInDom: any;

  constructor(private resultsService: ResultsService){}

  ngOnInit(): void {
    console.log("Routine recibida",this.routineId)
    this.getData();
    Chart.register(...registerables);
  }

  getData(){
    this.resultsService.getStudentSessionWithResults(this.routineId)
    .subscribe(
      (successResponse)=>{
        console.log(successResponse)
        this.studentSessionsWithResults = successResponse;
        this.dateInDom = this.studentSessionsWithResults[0].results[0].date;
        for (let i = 0; i < this.studentSessionsWithResults.length; i++) {
          this.loadChart(i);
        }
      },
      (error) =>{
        console.log(error);
      }
    );
  }

  loadChart(indice: number):any{
    let fecha = this.dateInDom.slice(0,10);
    let dia = fecha.slice(8,10);
    let mes = fecha.slice(5,7);
    let anio = fecha.slice(0,4);
    var resultadosDOM = document.getElementById('javascriptt');
    var fechasDOM = document.createElement('div');
    fechasDOM.setAttribute('id', 'fecha'+indice.toString());
    fechasDOM.innerHTML += `<h2>Resultados del: ${dia}/${mes}/${anio}</h2>`
    if(resultadosDOM){resultadosDOM.appendChild(fechasDOM)}

    var contenedorGraficas = document.createElement('div');
    var graficaUno = document.createElement('div');
    var graficaDos = document.createElement('div');
    var tablaDOM = document.createElement('div');
    contenedorGraficas.setAttribute('class','row');
    graficaUno.setAttribute('class','col-5');
    graficaDos.setAttribute('class','col-5');
    tablaDOM.setAttribute('class','row');
    tablaDOM.setAttribute('style','width:90%');
    graficaUno.setAttribute('id','graficaA'+indice.toString());
    graficaDos.setAttribute('id','graficaB'+indice.toString());
    tablaDOM.setAttribute('id','tabla'+indice.toString());

    var canvas1 = document.createElement('canvas');
    var canvas2 = document.createElement('canvas');
    canvas1.setAttribute('id', indice.toString());
    canvas2.setAttribute('id', indice.toString());
    this.score.push(canvas1);
    this.level.push(canvas2);
    if(graficaUno){graficaUno.appendChild(canvas1);}
    if(graficaDos){graficaDos.appendChild(canvas2);}

    if(contenedorGraficas){contenedorGraficas.appendChild(graficaUno)}
    if(contenedorGraficas){contenedorGraficas.appendChild(graficaDos)}
    if(resultadosDOM){resultadosDOM.appendChild(contenedorGraficas)}
    if(resultadosDOM){resultadosDOM.appendChild(tablaDOM)}


    const calif: any = [];
    const labelsRounds = [];
    const niveles: number[] = [];
    const resultadosParaTablas = this.studentSessionsWithResults[indice].results;
    this.resultadosTabla = resultadosParaTablas;

    console.log("RESULTADOS DE "+indice+" -> ",resultadosParaTablas)

    this.studentSessionsWithResults[indice].results.forEach(element => {
      calif.push(element.grade);
    });
    for (let i = 0; i < this.studentSessionsWithResults[indice].results.length; i++) {
      labelsRounds.push("Ronda"+(i+1))
    };
    this.studentSessionsWithResults[indice].results.forEach(element => {
      niveles.push(element.level);
    });



    new Chart(this.score[indice],{
      type:'line',
      data:{
        labels:labelsRounds,
        datasets:[{
          data: calif,
          label: "Calificación",
          backgroundColor: 'red',
          tension:0,
        }]
      },
      options:{
        responsive:true,
        maintainAspectRatio: false,
        scales:{
          y:{
            beginAtZero:true
          }
        }
      }
    })

    new Chart(this.level[indice],{
      type:'line',
      data:{
        labels:labelsRounds,
        datasets:[{
          data: niveles,
          label: "Nivel",
          backgroundColor: 'blue',
          tension:0,
          stepped: true,
          borderColor:'blue',
        }]
      },
      options:{
        responsive:true,
        maintainAspectRatio: false,
        scales:{
          y:{
            beginAtZero:true
          }
        }
      },
    })

    //Tablas
    const tabla = document.getElementById('tabla');
    const tablaTag = document.createElement('table');
    tablaTag.setAttribute('class', 'table');
    tablaTag.setAttribute('id', "table"+indice.toString());
    if(tablaDOM){tablaDOM.appendChild(tablaTag)}

    const table = document.getElementById("table"+indice.toString());
    const theadTag = document.createElement('thead');
    theadTag.setAttribute('class','thead-dark');
    theadTag.setAttribute('id', "thead"+indice.toString());
    if(table){table.appendChild(theadTag)}

    const tableHeader = document.getElementById("thead"+indice.toString());
    const trTag = document.createElement('tr');
    theadTag.setAttribute('id', "tr"+indice.toString());
    if(tableHeader){tableHeader.appendChild(trTag)}

    const trEtiquet = document.getElementById("tr"+indice.toString());
    const thTag1 = document.createElement('th');
    const thTag2 = document.createElement('th');
    const thTag3 = document.createElement('th');
    const thTag4 = document.createElement('th');
    const thTag5 = document.createElement('th');

    thTag1.setAttribute('scope', 'col');
    thTag2.setAttribute('scope', 'col');
    thTag3.setAttribute('scope', 'col');
    thTag4.setAttribute('scope', 'col');
    thTag5.setAttribute('scope', 'col');

    thTag1.textContent = 'Ronda';
    thTag2.textContent = 'Nivel';
    thTag3.textContent = 'Reactivos';
    thTag4.textContent = 'Aciertos';
    thTag5.textContent = 'Calificación';

    if(trTag){trTag.appendChild(thTag1)}
    if(trTag){trTag.appendChild(thTag2)}
    if(trTag){trTag.appendChild(thTag3)}
    if(trTag){trTag.appendChild(thTag4)}
    if(trTag){trTag.appendChild(thTag5)}

    const tbody = document.createElement('tbody');

    for(let i=0; i<resultadosParaTablas.length; i++){
      const trTagBody = document.createElement('tr');
      trTagBody.setAttribute('id', "tR"+indice.toString());

      const thTagR1 = document.createElement('td');
      const thTagR2 = document.createElement('td');
      const thTagR3 = document.createElement('td');
      const thTagR4 = document.createElement('td');
      const thTagR5 = document.createElement('td');

      thTagR1.textContent = resultadosParaTablas[i].round.toString();
      thTagR2.textContent = resultadosParaTablas[i].level.toString();
      thTagR3.textContent = resultadosParaTablas[i].resultDetails[0].possiblePoints.toString();
      thTagR4.textContent = resultadosParaTablas[i].resultDetails[0].points.toString();
      thTagR5.textContent = resultadosParaTablas[i].grade.toFixed(2).toString();


      if(trTagBody){trTagBody.appendChild(thTagR1)}
      if(trTagBody){trTagBody.appendChild(thTagR2)}
      if(trTagBody){trTagBody.appendChild(thTagR3)}
      if(trTagBody){trTagBody.appendChild(thTagR4)}
      if(trTagBody){trTagBody.appendChild(thTagR5)}
      if(tbody){tbody.appendChild(trTagBody)}
    }
    if(table){table.appendChild(tbody)}

  }


}
