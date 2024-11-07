import { Component, OnInit } from '@angular/core';
import { Chart, ChartOptions, registerables } from 'chart.js';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';

Chart.register(...registerables);

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss']
})
export class EstadisticasComponent implements OnInit{
  ngOnInit() {
    this.cargarGraficaCalorias();
    this.cargarGraficaPorciones();
  }

  cargarGraficaCalorias() {
    const caloriasCanvas = document.getElementById('caloriasChart') as HTMLCanvasElement;
    const ctx = caloriasCanvas?.getContext('2d');

    // Verificar que el contexto no sea nulo
    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
          datasets: [
            {
              label: 'Calorías Consumidas',
              data: [2000, 1800, 2200, 1900, 2300, 2100, 2500],  // Datos simulados
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1
            },
            {
              label: 'Calorías Recomendadas',
              data: [2000, 2000, 2000, 2000, 2000, 2000, 2000],  // Meta diaria
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }

  cargarGraficaPorciones() {
    const porcionesCanvas = document.getElementById('porcionesChart') as HTMLCanvasElement;
    const ctx = porcionesCanvas?.getContext('2d');

    // Verificar que el contexto no sea nulo
    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
          datasets: [
            {
              label: 'Porciones Consumidas',
              data: [6, 5, 7, 6, 7, 6, 8],  // Datos simulados
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
            },
            {
              label: 'Porciones Faltantes',
              data: [0, 1, 0, 1, 0, 1, 0],  // Datos simulados
              backgroundColor: 'rgba(153, 102, 255, 0.2)',
              borderColor: 'rgba(153, 102, 255, 1)',
              borderWidth: 1
            },
            {
              label: 'Porciones Excedentes',
              data: [0, 0, 0, 0, 1, 0, 1],  // Datos simulados
              backgroundColor: 'rgba(255, 159, 64, 0.2)',
              borderColor: 'rgba(255, 159, 64, 1)',
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }

  //Histograma
  lineChartData = {
    labels: ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"],
    datasets: [
      {
        data:[68, 69, 70, 69, 69, 68, 67],
        label: 'Registro de peso',
        backgroundColor: 'red',
        borderWidth: 2,
      fill: false,
      tension: 0
      }
    ]
  }
  lineChartOption: any = {
    responsive: false,
    plugins: {
      datalabels: {
        color: '#444',
        anchor: 'end',
        align: 'top'
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        suggestedMin: 67.5,
        suggestedMax: 70
      }
    }
  };
  
  lineChartPlugins = [ DatalabelsPlugin ];
}
