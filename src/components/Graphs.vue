<template>
  <v-container>
    <v-row class>
      <v-col cols="12">
        <!-- <v-carousel
	ref="carousel"
	height="100%"
	light
	hide-delimiter-background
	hide-delimiters
	@change="setCountryFromCarousel(c)"
	>
		<v-carousel-item
        v-for="(c, i) in countries.length"
        :key="i"
		>
	        <v-sheet
	        color="white"
			height="100%"
			tile
			>
				<v-row
				class="fill-height"
				align="center"
				justify="center"
				>
					<v-col
					cols="12"
        >-->
        <v-card elevation="0">
          <v-card-title>Datos del COVID-19 en {{ pointer }}</v-card-title>
          <v-card-text>
            <v-row class="fill-height" align="center" justify="center">
              <v-col cols="12">
                <v-card class="mt-4 mx-auto">
                  <v-sheet class="v-sheet--offset mx-auto" color="cyan" elevation="12">
                    <v-sparkline
                      fill
                      :gradient="gradient"
                      :line-width="width"
                      :padding="padding"
                      :smooth="radius || false"
                      :value="valueConfirmedNew"
                      :labels="labels"
                      auto-draw
                    ></v-sparkline>
                  </v-sheet>

                  <v-card-text class="pt-0">
                    <div class="title font-weight-light mb-2">Nuevos Casos por día</div>
                    <div
                      class="subheading font-weight-light grey--text"
                    >Con respecto al día anterior</div>
                    <v-divider class="my-2"></v-divider>
                    <v-icon class="mr-2" small>mdi-clock</v-icon>
                    <span class="caption grey--text font-weight-light">Actualizado al día</span>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12">
                <v-card class="mt-4 mx-auto">
                  <v-sheet class="v-sheet--offset mx-auto" color="cyan" elevation="12">
                    <v-sparkline
                      fill
                      :gradient="gradient"
                      :line-width="width"
                      :padding="padding"
                      :smooth="radius || false"
                      :value="valueDeathsNew"
                      :labels="labels"
                      auto-draw
                    ></v-sparkline>
                  </v-sheet>

                  <v-card-text class="pt-0">
                    <div class="title font-weight-light mb-2">Nuevas muertes por día</div>
                    <div
                      class="subheading font-weight-light grey--text"
                    >Con respecto al día anterior</div>
                    <v-divider class="my-2"></v-divider>
                    <v-icon class="mr-2" small>mdi-clock</v-icon>
                    <span class="caption grey--text font-weight-light">Actualizado al día</span>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12">
                <v-card class="mt-4 mx-auto">
                  <v-sheet class="v-sheet--offset mx-auto" color="cyan" elevation="12">
                    <v-sparkline
                      fill
                      :gradient="gradient2"
                      :line-width="width"
                      :padding="padding"
                      :smooth="radius || false"
                      :value="valueRecoveredNew"
                      :labels="labels"
                      auto-draw
                    ></v-sparkline>
                  </v-sheet>

                  <v-card-text class="pt-0">
                    <div class="title font-weight-light mb-2">Nuevos curados por día</div>
                    <div
                      class="subheading font-weight-light grey--text"
                    >Con respecto al día anterior</div>
                    <v-divider class="my-2"></v-divider>
                    <v-icon class="mr-2" small>mdi-clock</v-icon>
                    <span class="caption grey--text font-weight-light">Actualizado al día</span>
                  </v-card-text>
                </v-card>
              </v-col>
              <!--
              <v-col cols="4">
                <v-card v-if="averageLethaly != null">
                  <v-card-title>
                    <span class="mx-auto">Letalidad Media</span>
                  </v-card-title>
                  <v-card-text class="text-center display-1">
                    <span>{{ averageLethaly.toFixed(2) }} %</span>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="4">
                <v-card v-if="averageLethaly != null">
                  <v-card-title>
                    <span class="mx-auto">Letalidad Media</span>
                  </v-card-title>
                  <v-card-text class="text-center display-1">
                    <span>{{ averageLethaly.toFixed(2) }} %</span>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="4">
                <v-card v-if="averageLethaly != null">
                  <v-card-title>
                    <span class="mx-auto">Letalidad Media</span>
                  </v-card-title>
                  <v-card-text class="text-center display-1">
                    <span>{{ averageLethaly.toFixed(2) }} %</span>
                  </v-card-text>
                </v-card>
              </v-col>
              -->
            </v-row>
          </v-card-text>
          <v-card-actions class="px-3">
            <v-expansion-panels>
              <v-expansion-panel>
                <v-expansion-panel-header>Ver estadísticas</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-data-table :headers="headers" :items="oneCountryData" sort-by="date" sort-desc></v-data-table>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card-actions>
        </v-card>
        <!-- </v-col>
				</v-row>
			</v-sheet>
		</v-carousel-item>
        </v-carousel>-->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const gradients = [
  ["#222"],
  ["#42b3f4"],
  ["red", "orange", "yellow"],
  ["purple", "violet"],
  ["#00c6ff", "#F0F", "#FF0"],
  ["#f72047", "#ffd200", "#1feaea"]
];
import axios from "axios";
import { mapState, mapGetters, mapActions } from "vuex";
import { GChart } from "vue-google-charts";

export default {
  name: "Graphs",
  components: {
    GChart
  },
  data: () => ({
    fill: true,
    gradient: gradients[4],
    gradient2: gradients[3],
    gradients,
    padding: 8,
    radius: 5,
    value: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
    width: 2,
    headers: [
      {
        text: "Evolución",
        align: "start",
        sortable: true,
        value: "date"
      },
      { text: "Contagios", value: "confirmed" },
      { text: "Muertes", value: "deaths" },
      { text: "Curados", value: "recovered" },
      { text: "Contagios nuevos", value: "confirmedNew" },
      { text: "Muertes nuevas", value: "deathsNew" },
      { text: "Curados nuevos", value: "recoveredNew" }
    ],
    contagiosDiariosOptions: {
      chart: {
        title: "Nuevos Contagios",
        subtitle: "Aumento de contagios diarios"
      }
    },
    aumentoEnfermosOptions: {
      chart: {
        title: "Aumento de Positivos",
        subtitle: "Diferencia entre Nuevos Contagios y Nuevos Recuperados "
      }
    }
  }),
  computed: {
    ...mapState({
      pointer: state => state.stats.pointer,
      countries: state => state.stats.countries,
      dailyConfirms: state => state.stats.dailyConfirms,
      dailySick: state => state.stats.dailySick,
      averageLethaly: state => state.stats.averageLethaly
    }),
    ...mapGetters({
      oneCountryData: "stats/oneCountryData"
    }),
    labels() {
      return Array.from(this.oneCountryData, x => x.date);
    },
    valueConfirmedNew() {
      return Array.from(this.oneCountryData, x => x.confirmedNew);
    },
    valueDeathsNew() {
      return Array.from(this.oneCountryData, x => x.deathsNew);
    },
    valueRecoveredNew() {
      return Array.from(this.oneCountryData, x => x.recoveredNew);
    },
    fechas() {
      let res = [];
      this.oneCountryData.forEach(function(e, i) {
        res.push(e.date);
      });
      return res;
    },
    confirmados() {
      let res = [];
      this.oneCountryData.forEach(function(e) {
        res.push(e.confirmed);
      });
      return res;
    },
    curados() {
      let res = [];
      this.oneCountryData.forEach(function(e) {
        res.push(e.recovered);
      });
      return res;
    },
    curadosDiarios() {
      let res = [];
      res.push(["Fecha", "Nuevos Curados"]);
      this.oneCountryData.map(function(e, i, arr) {
        if (i > 0) {
          res.push([e.date, e.recovered - arr[i - 1].recovered]);
        } else {
          res.push([e.date, e.recovered]);
        }
      });

      return res;
    },
    muertes() {
      let res = [];
      this.oneCountryData.forEach(function(e) {
        res.push(e.deaths);
      });
      return res;
    },
    muertesDiarias() {
      let res = [];
      res.push(["Fecha", "Nuevos Muertes"]);
      this.oneCountryData.map(function(e, i, arr) {
        if (i > 0) {
          res.push([e.date, e.deaths - arr[i - 1].deaths]);
        } else {
          res.push([e.date, e.deaths]);
        }
      });

      return res;
    }
  },
  methods: {
    ...mapActions({
      calculateDailySick: "stats/calculateDailySick",
      calculateDailyConfirms: "stats/calculateDailyConfirms",
      calculateAverageLethaly: "stats/calculateAverageLethaly"
    })
  },
  mounted() {
    let _vue = this;
    this.$store.commit("stats/setPointer", "Spain");

    axios
      .get("https://pomber.github.io/covid19/timeseries.json")
      .then(function(res) {
        _vue.$store.commit("stats/setData", res.data);
        _vue.$store.commit("stats/setCountries", Object.keys(res.data));
        _vue.$store.commit("stats/setDataSpain", res.data.Spain);

        _vue.calculateDailySick().finally(function() {});

        _vue.calculateDailyConfirms().finally(function() {});

        _vue.calculateAverageLethaly().finally(function() {});
      });
  }
};
</script>

