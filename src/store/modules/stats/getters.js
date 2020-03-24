import moment from 'moment';
export default {
	oneCountryData(state) {
		let res = [];
		let temp = [];
		if (state.data[state.pointer] != undefined) {
			res = state.data[state.pointer];
			var confirmedNew = 0;
			var deathsNew = 0;
			var recoveredNew = 0;
			var confirmedOld = 0;
			var deathsOld = 0;
			var recoveredOld = 0;

			res.forEach(function (e) {
				console.log(deathsOld);
				console.log(e.deaths);
				deathsNew = e.deaths - deathsOld;
				console.log(deathsNew);
				recoveredNew = e.recovered - recoveredOld;
				confirmedNew = e.confirmed - confirmedOld;
				deathsOld = e.deaths;
				recoveredOld = e.recovered;
				confirmedOld = e.confirmed;
				e.date = moment(e.date).format("MM - DD")
				e.confirmedNew = confirmedNew;
				e.recoveredNew = recoveredNew;
				e.deathsNew = deathsNew;
				temp.push(e)
			})
		}
		return temp;
	}
}