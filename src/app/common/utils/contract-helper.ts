import { ContractModel } from '@common/models/contract-model';
import { ChartData } from '@common/models/chart-data';

export abstract class ContractHepler {

	private static _getSubStep(contract: ContractModel, id: number) {
		if (!contract) {
			return null;
		}

		for (const step of contract.steps) {
			const res = step.find(x => x.id === id);
			if (res) {
				return res;
			}
		}
		return null;
	}

	public static getSubStepChartData(contract: ContractModel, subStepId: number): ChartData {
		if (!contract) {
			return null;
		}

		const subStep = ContractHepler._getSubStep(contract, subStepId);
		if (!subStep) {
			return null;
		}

		return subStep.data;
	}

	public static getStepChartData(contract: ContractModel, stepId: number): ChartData {
		if (!contract) {
			return null;
		}

		const step = contract.steps[stepId];
		const res: ChartData = {
			plan: [],
			fact: []
		};

		step.forEach((x, subStepIndx) => {
			x.data.fact.forEach((val, valIndx) => {
				if (!subStepIndx) {
					res.fact[valIndx] = val;
				} else {
					res.fact[valIndx] += val;
				}
			});

			x.data.plan.forEach((val, valIndx) => {
				if (!subStepIndx) {
					res.plan[valIndx] = val;
				} else {
					res.plan[valIndx] += val;
				}
			});
		});

		return res;
	}

}
