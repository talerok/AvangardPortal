import { Component, OnInit, ViewChild, ElementRef, ChangeDetectionStrategy, Input } from '@angular/core';
import * as Chart from 'chart.js';
import { ChartData } from '@common/models/chart-data';

@Component({
	selector: 'app-detail-chart',
	templateUrl: './chart.component.html',
	styleUrls: ['./chart.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartComponent implements OnInit {

	@ViewChild('chart', { static: true }) chartElement: ElementRef;

	private _chartData: ChartData;
	private _chart: Chart;

	@Input() set data(value: ChartData) {
		this._chartData = value;
		this._updateChart();
	}

	private get _context() {
		return this.chartElement.nativeElement.getContext('2d');
	}

	private _updateChart() {
		if (!this._chart) {
			return;
		}

		this._chart.data.datasets[0].data = this._chartData ? this._chartData.plan : [];
		this._chart.data.datasets[1].data = this._chartData ? this._chartData.fact : [];
		this._chart.update();
	}

	private _initChart() {
		this._chart = new Chart(
			this._context,
			{
				type: 'line',
				data: {
					labels: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Окрябрь', 'Ноябрь', 'Декабрь'],
					datasets: [{
						label: 'План',
						data: this._chartData ? this._chartData.plan : [],
						borderColor: '#688dcf',
						lineTension: 0,
						borderWidth: 1
					},
					{
						label: 'Факт',
						data: this._chartData ? this._chartData.fact : [],
						borderColor: '#ed8035',
						lineTension: 0,
						borderWidth: 1
					}
					],
				},
				options: {
					responsive: true,
					maintainAspectRatio: false,
					scales: {
						yAxes: [{
							ticks: {
								beginAtZero: true
							}
						}]
					}
				}
			}
		);
	}

	constructor() {

	}

	ngOnInit() {
		this._initChart();
	}

}
