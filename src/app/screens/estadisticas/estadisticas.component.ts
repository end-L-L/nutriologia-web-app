import { Component, OnInit } from '@angular/core';
import { Chart, ChartOptions, registerables } from 'chart.js';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss']
})
export class EstadisticasComponent implements OnInit{
  ngOnInit() {
  }

  // Bar Chart 1
  barChartData1: ChartData = {
    labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
    datasets: [
      {
        label: 'Calorías Consumidas',
        data: [2000, 1800, 2200, 1900, 2300, 2100, 2500],  // Datos simulados
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        // borderColor: 'rgba(255, 99, 132, 1)',
        // borderWidth: 1
      },
      {
        label: 'Calorías Recomendadas',
        data: [2000, 2000, 2000, 2000, 2000, 2000, 2000],  // Meta diaria
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        // borderColor: 'rgba(54, 162, 235, 1)',
        // borderWidth: 1
      }
    ]
  };

  // Bar Chart 2
  barChartData2: ChartData = {
    labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
    datasets: [
      {
        label: 'Porciones Consumidas',
        data: [8, 6, 8, 6, 8, 8, 8],  // Datos simulados
        backgroundColor: 'rgba(75, 192, 192, 0.2)'
      },
      {
        label: 'Porciones Faltantes',
        data: [0, 2, 0, 2, 0, 0, 0],  // Datos simulados
        backgroundColor: 'rgba(153, 102, 255, 0.2)'
      },
      {
        label: 'Porciones Excedentes',
        data: [0, 0, 2, 0, 1, 1, 3],  // Datos simulados
        backgroundColor: 'rgba(255, 159, 64, 0.2)'
      }
    ]
  };

  barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  barChartPlugins = [DatalabelsPlugin];

  // Line Chart
  lineChartData: ChartData ={
    labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
    datasets: [
      {
        data:[68, 69, 70, 69, 69, 68, 67],
        label: 'Registro de Peso',
        backgroundColor: 'red',
      },
    ],
  };

  lineChartOptions = {
    responsive:false,
    maintainAspectRatio: false,
  }

  lineChartPlugins = [ DatalabelsPlugin ];

  // Pie Chart
  pieChartData: ChartData = {
    labels: ['Proteínas', 'Carbohidratos', 'Grasas'], 
    datasets: [
      {
        data: [40, 35, 25],
        label: 'Distribución de Macros',
        backgroundColor: ['#FCFF44', '#F1C8F2', '#31E731'],
      },
    ],
  };

  pieChartOption = {
    responsive: true,
    maintainAspectRatio: false,
  };

  pieChartPlugins = [DatalabelsPlugin];
}

interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

interface ChartDataset {
  data: number[];
  label: string;
  backgroundColor: string | string[];
}