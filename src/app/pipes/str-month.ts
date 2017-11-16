import {Pipe} from '@angular/core';

@Pipe({
  name: 'strMonth'
})
export class StrMonth {
	transform(value, args) {
		let months = [
			'Janvier', 'Février', 'Mars',
			'Avril', 'Mai', 'Juin',
			'Juillet', 'Août', 'Septembre',
			'Octobre', 'Novembre', 'Décembre',
		];
		return months[value];
	}
}
