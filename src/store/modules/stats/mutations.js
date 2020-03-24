export default {
  setCountries(state, v) {
    state.countries = v;
  },
  setData(state, v) {
    state.data = v;
  },
  setDataSpain(state, v) {
    state.dataSpain = v;
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
  setAverageLethaly(state, v) {
    state.averageLethaly = v;
  },
  resetVariables() {
    state.data = [];
    state.dailyConfirms = [];
    state.dailySick = [];
    state.mediumLethaly = null;
  }
}