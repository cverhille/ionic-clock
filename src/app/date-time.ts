
export class DateTime {

	private timer: any;
	mday: number;
	month: number;
	year: number;
	wday: number;
	hours: number;
	minutes: number;
	seconds: number;
	season: string;
	seasons = [ 'winter', 'spring', 'summer', 'autumn' ];

	constructor() {
		this.timer = setInterval( () => {
			let dt = new Date();
			this.wday = dt.getDay();
			this.mday = dt.getDate();
			this.month = dt.getMonth();
			this.year = dt.getFullYear();
			this.hours = dt.getHours();
			this.minutes = dt.getMinutes();
			this.seconds = dt.getSeconds();
			switch(this.month+1) {
			case 12:
			case 1:
			case 2:
				this.season = this.seasons[0];
				break;
			case 3:
			case 4:
			case 5:
				this.season = this.seasons[1];
				break;
			case 6:
			case 7:
			case 8:
				this.season = this.seasons[2];
				break;
			case 9:
			case 10:
			case 11:
				this.season = this.seasons[3];
				break;
			}
			//this.season = this.seasons[this.month % 3];
		}, 1000);
	}
}
