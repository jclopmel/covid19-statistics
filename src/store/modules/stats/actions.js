import moment from 'moment';
export default{
	calculateDailySick({commit, state, getters}){
		commit('setDailySick', []);

		let res = [];
		let _vue = this;
		let n = 0; 
		let oneCountryData = getters.oneCountryData;

		if(oneCountryData != undefined){

			res.push( ["Fecha", "Nuevos Enfermos"] )
			oneCountryData.map(function(e, i, arr){

				
				let fecha = (i%5) == 0 ? e.date : "";

				if(i > 0){
					n = (e.confirmed-(arr[i-1].confirmed)) - (e.recovered-(arr[i-1].recovered));
					n < 0 ? n = 0 : null;
					res.push( [fecha, n ] )
				}else{
					res.push( [e.date, e.confirmed - e.recovered ] );
				}
				
			})
		}

		commit('setDailySick', res);
	},
	calculateDailyConfirms({commit, state, getters}){
		commit('setDailyConfirms', []);

		let res = [];
		let _vue = this;
		let oneCountryData = getters.oneCountryData;

		if(oneCountryData != undefined){

			res.push( ["Fecha", "Nuevos Contagios"] )
			oneCountryData.map(function(e, i, arr){
				let fecha = (i%5) == 0 ? e.date : "";
				if(i > 0){
					res.push( [fecha, e.confirmed-(arr[i-1].confirmed) ] )
				}else{
					res.push( [e.date, e.confirmed ] );
				}
				
			})
		}

		commit('setDailyConfirms', res);
	},
	calculateAverageLethaly({commit, state, getters}){
		commit('setAverageLethaly', null);

		let oneCountryData = getters.oneCountryData;
		let res = 0;
		let ultimaValoracion 	= oneCountryData[oneCountryData.length-1] 
		let totalConfirmados 	= ultimaValoracion.confirmed
		let totalFallecidos 	= ultimaValoracion.deaths
		let totalRecuperados 	= ultimaValoracion.recovered

		res = totalFallecidos / (totalConfirmados-totalRecuperados) * 100;

		commit('setAverageLethaly', res);
	},
}