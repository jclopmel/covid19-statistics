export default{
	setCountries(state, v) {
      state.countries = v;
    },
    setData(state, v) {
      state.data = v;
    },
    setPointer(state, v) {
      state.pointer = v;
    },
    setDailyConfirms(state, v) {
      state.dailyConfirms = v;
    },
    setDailySick(state, v) {
      state.dailySick = v;
    },
    setDailyData(state, v) {
      state.dailyData = v;
    },
    setAverageLethaly(state, v) {
      state.averageLethaly = v;
    },
    resetVariables(state){
  		state.dailyConfirms = [];
  		state.dailySick = [];
      state.dailyData = [];
  		state.mediumLethaly = null;
    }
}