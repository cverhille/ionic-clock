import {Pipe} from '@angular/core';

@Pipe({
  name: 'strDay'
})
export class StrDay {
	transform(value, args) {
		let days = [
			'Lundi', 'Mardi', 'Mercredi',
			'Jeudi', 'Vendredi', 'Samedi',
			'Dimanche'];
		return days[value];
	}
}
