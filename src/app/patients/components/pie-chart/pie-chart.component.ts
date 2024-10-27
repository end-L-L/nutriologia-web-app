import { Component, Input, OnInit, OnChanges, SimpleChanges, OnDestroy, ChangeDetectorRef } from '@angular/core';

import * as echarts from 'echarts';
import { Macros } from '../../interfaces';

type EChartsOption = echarts.EChartsOption;

@Component({
  selector: 'pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit, OnChanges, OnDestroy {
  @Input() data!: Macros;
  private chart: echarts.ECharts | null = null;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    const chartDom = document.getElementById('chart')!;
    this.chart = echarts.init(chartDom);
    this.renderChart(this.data);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.chart) {
      this.renderChart(this.data);
      this.cdr.detectChanges();
    }
  }

  private transformData(data: Macros): { value: number; name: string }[] {
    const { proteinas, carbohidratos, grasas } = data;
    return [
      { value: proteinas, name: 'Proteínas' },
      { value: carbohidratos, name: 'Carbohidratos' },
      { value: grasas, name: 'Grasas' },
    ];
  }

  private renderChart(data: Macros) {
    const option: EChartsOption = {
      tooltip: {
        trigger: 'item',
      },
      series: [
        {
          name: 'Macro',
          type: 'pie',
          radius: '50%',
          data: this.transformData(data),
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };

    this.chart?.setOption(option);
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.dispose();
      this.chart = null;
    }
  }
}
