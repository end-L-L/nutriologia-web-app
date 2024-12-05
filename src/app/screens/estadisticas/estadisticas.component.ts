import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart, ChartOptions, registerables } from 'chart.js';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { number } from 'echarts';
import { EstadisticasCaloriasService } from 'src/services/estadisticas-calorias.service';
import { EstadisticasPesoMensualService } from 'src/services/estadisticas-peso-mensual.service';
import { EstadisticasPorcionService } from 'src/services/estadisticas-porcion.service';
import { PacienteService } from 'src/services/paciente.service';

Chart.register(...registerables);

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss']
})
export class EstadisticasComponent implements OnInit{

  public chartCalorias: any;
  public chartPorciones: any;  
  public chartPesoMensual: any; 

  public lineChartData: any = {
    labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
    datasets: [
      {
        data: [75, 72, 71, 70, 68, 69, 70, 69, 69, 68, 67, 65], // Datos predeterminados
        label: 'Registro de peso',
        backgroundColor: 'red',
        borderWidth: 2,
        fill: false,
        tension: 0
      }
    ]
  };

  public lineChartOption: any = {
    responsive: true,
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
        suggestedMin: 63,
        suggestedMax: 70
      }
    }
  };

  public lineChartPlugins = [DatalabelsPlugin];
  public pacienteId: number = 0;

  constructor(
    private seguimientoCalorico: EstadisticasCaloriasService,
    private seguimientoPorPorciones: EstadisticasPorcionService,
    private seguimientoPorPesomensual: EstadisticasPesoMensualService,
    private route: ActivatedRoute,

  ){}

  ngOnInit() {
    this.cargarDatosDinamicos(); 
    this.cargarGraficaCalorias();
    this.cargarGraficaPorciones();
    this.route.params.subscribe(params => {
      this.pacienteId = +params['id'];
    })
  }

  cargarGraficaCalorias(): void {
    this.seguimientoCalorico.obtenerSeguimientos(this.pacienteId).subscribe(
      (datos) => {
        // Procesar los datos del backend para usarlos en la gráfica
        const caloriasConsumidas = datos[0]?.calorias_consumidas || 0;
        const caloriasRecomendadas = datos[0]?.calorias_recomendadas || 0;
        const caloriasRestantes = caloriasRecomendadas - caloriasConsumidas > 0 ? caloriasRecomendadas - caloriasConsumidas : 0;
        const caloriasExcedentes = caloriasConsumidas > caloriasRecomendadas ? caloriasConsumidas - caloriasRecomendadas : 0;

        const data = {
          labels: ['Consumidas', 'Restantes', 'Excedentes'],
          datasets: [
            {
              label: 'Calorías',
              data: [caloriasConsumidas, caloriasRestantes, caloriasExcedentes],
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
              hoverOffset: 4,
            }
          ]
        };

        const options = {
          responsive: true,
          plugins: {
            legend: {
              position: 'top' as const,  // Usa 'as const' para asegurarte de que el valor sea del tipo correcto
            },
            tooltip: {
              enabled: true,
            },
          },
        };

        this.chartCalorias = new Chart('chartCaloriasCanvas', {
          type: 'doughnut',
          data: data,
          options: options,
        });
      },
      (error) => {
        console.error('Error al obtener datos de seguimiento calórico:', error);
      }
    );
  }
  cargarGraficaPorciones(): void {
    this.seguimientoPorPorciones.obtenerPorciones(this.pacienteId).subscribe(
      (datos) => {
        const porcionesConsumidas = datos[0]?.porciones_consumidas || 0;
        const porcionesRecomendadas = datos[0]?.porciones_recomendadas || 0;
        const porcionesExcedentes = datos[0]?.porciones_excedentes || 0;
  
        const data = {
          labels: ['Consumidas', 'Faltantes', 'Excedentes'],
          datasets: [
            {
              label: 'Porciones',
              data: [porcionesConsumidas, porcionesRecomendadas - porcionesConsumidas, porcionesExcedentes],
              backgroundColor: ['#00FF00', '#FF00FF', '#0000FF'],
              hoverOffset: 4,
            }
          ]
        };
  
        const options = {
          responsive: true,
          plugins: {
            legend: {
              position: 'top' as const, // Resuelve el error
            },
            tooltip: {
              enabled: true,
            },
          },
        };
  
        this.chartPorciones = new Chart('chartPorcionesCanvas', {
          type: 'doughnut',
          data: data,
          options: options,
        });
      },
      (error) => {
        console.error('Error al obtener datos de seguimiento de porciones:', error);
      }
    );
  }
  
  // Cargar datos dinámicos para el gráfico de línea
  cargarDatosDinamicos(): void {
    this.seguimientoPorPesomensual.getPesosMensuales(this.pacienteId).subscribe(
      (datos) => {
        if (datos && datos.length) {
          const meses = datos.map((d: any) => d.mes);
          const pesos = datos.map((d: any) => d.peso_calculado);

          this.lineChartData.labels = meses;
          this.lineChartData.datasets[0].data = pesos;

          // Ahora se carga el gráfico de líneas dinámicamente
          this.chartPesoMensual = new Chart('chartPesoMensualCanvas', {
            type: 'line',
            data: this.lineChartData,
            options: this.lineChartOption,
            plugins: this.lineChartPlugins
          });
        }
      },
      (error) => {
        console.error('Error al obtener datos de peso mensual:', error);
      }
    );
  }
}
