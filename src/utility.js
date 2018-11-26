const utility = {
	isSameWeek(date1, date2) {
		let oneDayInMilliSeconds = 1000 * 60 * 60 * 24;
		let dayCount1 = parseInt(date1.getTime()/oneDayInMilliSeconds);
		let dayCount2 = parseInt(date2.getTime()/oneDayInMilliSeconds);
		if(parseInt((dayCount1+4)/7) === parseInt((dayCount2+4)/7)) {
			return true;
		}
		return false;
	},

	isSameDay(date1, date2) {
		let isSameDay = (date1.getDate() === date2.getDate() &&
			date1.getYear() === date2.getYear() &&
			date1.getMonth() === date2.getMonth()) ? true : false;
		return isSameDay;
	},

	getWeekDay(day) {
		switch(day) {
			case 0:
			 return 'Sunday';
			case 1:
			 return 'Monday';
			case 2:
			 return 'Tuesday';
			case 3:
				return 'Wednesday';
			case 4:
				return 'Thursday';
			case 5:
				return 'Friday';
			case 6:
				return 'Saterday';
			default:
				return 'Unknown';
		}
	}
}

export default utility;
