import moment from 'moment';
export default{
	oneCountryData(state){
		let res = [];
		if(state.data[state.pointer] != undefined){
			res = state.data[state.pointer];

			let temp = [];
			res.forEach(function(e){
				e.date = moment(e.date).format("MM - DD")
				temp.push(temp)
			})
		}
		
		return res;
	}
}