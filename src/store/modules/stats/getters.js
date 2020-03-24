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
				if (e.confirmed > 50) {
					deathsNew = e.deaths - deathsOld;
					recoveredNew = e.recovered - recoveredOld;
					confirmedNew = e.confirmed - confirmedOld;
					deathsOld = e.deaths;
					recoveredOld = e.recovered;
					confirmedOld = e.confirmed;
					e.dateCompleto = moment(e.date).format("DD - MM - YYYY")
					e.date = moment(e.date).format("DD")
					e.confirmedNew = confirmedNew;
					e.recoveredNew = recoveredNew;
					e.deathsNew = deathsNew;
					temp.push(e)
				}
			})
		}
		return temp;
	}
}