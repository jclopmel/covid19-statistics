<template>
<v-container>
<v-row class="">
<v-col
class="pa-0"
cols="12">

	<v-card
	elevation="0"
	>
		<v-card-title>
			Datos del COVID-19 en {{ pointer }}
		</v-card-title>
		<v-card-text>
			<v-row
			class="fill-height"
			align="center"
			justify="center"
			>
				<v-col
				class="pa-0"
				cols="12"
				>
					<v-skeleton-loader
					v-if="dailyConfirms.length == 0 || dailyConfirms == undefined"
					type="image"
					tile
					></v-skeleton-loader>
					<GChart
					v-else
					type="LineChart"
					:data="dailyConfirms"
					:options="contagiosDiariosOptions"
					/>

					<v-skeleton-loader
					v-if="dailySick.length == 0 || dailySick == undefined"
					type="image"
					tile
					></v-skeleton-loader>
					<GChart
					type="LineChart"
					:data="dailySick"
					:options="aumentoEnfermosOptions"
					/>

					<v-skeleton-loader
					v-if="dailyData.length == 0 || dailyData == undefined"
					type="image"
					tile
					></v-skeleton-loader>
					<GChart
					type="AreaChart"
					:data="dailyData"
					:options="dailyDataOptions"
					/>

				</v-col>
				<v-col
				height="100%"
				cols="4"
				>
					<v-card v-if="averageLethaly != null">
						<v-card-title class="pa-1 pa-sm-2">
							<span class="text-center subtitle-1 display-md-2 mx-auto">Letalidad Media</span>
						</v-card-title>
						<v-card-text class="text-center subtitle-2 display-md-1">
							<span class="text-center">{{ averageLethaly.toFixed(2) }} %</span>
						</v-card-text>
					</v-card>
				</v-col>
				<v-col
				height="100%"
				cols="4"
				>
					<!-- <v-card v-if="averageLethaly != null">
						<v-card-title class="pa-1 pa-sm-2">
							<span class="mx-auto">Letalidad Media</span>
						</v-card-title>
						<v-card-text class="text-center display-1">
							<span>{{ averageLethaly.toFixed(2) }} %</span>
						</v-card-text>
					</v-card> -->
				</v-col>
				<v-col
				height="100%"
				cols="4"
				>
					<!-- <v-card v-if="averageLethaly != null">
						<v-card-title class="pa-1 pa-sm-2">
							<span class="mx-auto">Letalidad Media</span>
						</v-card-title>
						<v-card-text class="text-center display-1">
							<span>{{ averageLethaly.toFixed(2) }} %</span>
						</v-card-text>
					</v-card> -->
				</v-col>
			</v-row>
		</v-card-text>
		<v-card-actions class="px-3">
			<v-expansion-panels>
				<v-expansion-panel >
					<v-expansion-panel-header>Ver estadísticas</v-expansion-panel-header>
					<v-expansion-panel-content>
						<v-skeleton-loader
						v-if="oneCountryData.length == 0 || dailyConfirms == undefined"
						type="table"
						tile
						></v-skeleton-loader>
						<v-data-table
						v-else
						:headers="headers"
						:items="oneCountryData"
						></v-data-table>
					</v-expansion-panel-content>
				</v-expansion-panel>
			</v-expansion-panels>

		</v-card-actions>
	</v-card>

</v-col>
</v-row>
</v-container>
</template>

<script>
	import axios from 'axios'
	import { mapState, mapGetters, mapActions } from 'vuex';
	import { GChart } from 'vue-google-charts'

	export default {
		name: 'Graphs',
		components: {
			GChart
		},
		data: () => ({
			headers: [
			  {
				text: 'Evolución',
				align: 'start',
				sortable: true,
				value: 'date',
			  },
			  { text: 'Contagios', value: 'confirmed' },
			  { text: 'Muertes', value: 'deaths' },
			  { text: 'Curados', value: 'recovered' }
			],
		  	contagiosDiariosOptions: {
		  		chartArea: {
		  			width: '80%'
		  		},
	        	legend: 'none',
				title: 'Aumento de contagios diarios',
				titleTextStyle: {
					color: '#3c3c3c',
					fontSize: '16',
					bold: true,
				    textAlign: 'center'
				},
				colors: ['green', 'yellow'],
				vAxis: {
					format: 'short',
					scaleType: 'log',
					title: 'Nuevos contagios ( log(x) )',
				  	titleTextStyle: {
					    align: 'center'
					}
				},
				hAxis: {
					title: 'Fechas (mes/dia)',
				  	titleTextStyle: {
					    align: 'center'
					},
					slantedText: false
				}
			},
			aumentoEnfermosOptions: {
				chartArea: {
					width: '80%'
				},
	        	legend: 'none',
				title: 'Aumento de Positivos diarios',
				titleTextStyle: {
					color: '#3c3c3c',
					fontSize: '16',
					bold: true,
				    textAlign: 'center'
				},
				colors: ['green', 'yellow'],
				vAxis: {
					format: 'short',
					scaleType: 'log',
					title: 'Nuevos positivos ( log(x) )',
				  	titleTextStyle: {
					    align: 'center'
					}
				},
				hAxis: {
					title: 'Fechas (mes/dia)',
				  	titleTextStyle: {
					    align: 'center'
					},
					slantedText: false
				}
			},
			dailyDataOptions:{
				chartArea: {
					width: '80%'
				},
	        	legend: {position: 'top', maxLines: 3},
				title: 'Datos diarios',
				titleTextStyle: {
					color: '#3c3c3c',
					fontSize: '16',
					bold: true,
				    textAlign: 'center'
				},
				colors: ['grey', 'green', 'red'],
				vAxis: {
					format: 'short',
					scaleType: 'log',
					title: 'Casos ( log(x) )',
				  	titleTextStyle: {
					    align: 'center'
					}
				},
				hAxis: {
					title: 'Fechas (mes/dia)',
				  	titleTextStyle: {
					    align: 'center'
					},
					slantedText: false
				}
			}

		}),
		computed:{
			...mapState({
				pointer: state => state.stats.pointer,
				countries: state => state.stats.countries,
				dailyConfirms: state => state.stats.dailyConfirms,
				dailySick: state => state.stats.dailySick,
				dailyData: state => state.stats.dailyData,
				averageLethaly: state => state.stats.averageLethaly
			}),
			...mapGetters({
				oneCountryData: "stats/oneCountryData"
			}),
			fechas(){
				let res = [];
				this.oneCountryData.forEach(function(e, i){
					res.push(e.date)
				})
				return res;
			},
			confirmados(){
				let res = [];
				this.oneCountryData.forEach(function(e){
					res.push(e.confirmed)
				})
				return res;
			},
			curados(){
				let res = [];
				this.oneCountryData.forEach(function(e){
					res.push(e.recovered)
				})
				return res;
			},
			curadosDiarios(){
				let res = [];
				res.push( ["Fecha", "Nuevos Curados"] )
				this.oneCountryData.map(function(e, i, arr){
					if(i > 0){
						res.push( [e.date, e.recovered-(arr[i-1].recovered) ] )
					}else{
						res.push( [e.date, e.recovered ] );
					}
					
				})

				return res;
			},
			muertes(){
				let res = [];
				this.oneCountryData.forEach(function(e){
					res.push(e.deaths)
				})
				return res;
			},
			muertesDiarias(){
				let res = [];
				res.push( ["Fecha", "Nuevos Muertes"] )
				this.oneCountryData.map(function(e, i, arr){
					if(i > 0){
						res.push( [e.date, e.deaths-(arr[i-1].deaths) ] )
					}else{
						res.push( [e.date, e.deaths ] );
					}
					
				})

				return res;
			}
		},
		methods:{
			...mapActions({
				recalculateStats: "stats/recalculateStats"
			})
		},
		mounted(){
			let _vue = this;
			this.$store.commit('stats/setPointer', "Spain" )

			axios.get('https://pomber.github.io/covid19/timeseries.json')
			.then(function(res){
				_vue.$store.commit('stats/setData', res.data )
				_vue.$store.commit('stats/setCountries', Object.keys(res.data) )

				_vue.recalculateStats()
				.finally(function(){
					
				})

 			})

		},
		watch:{
			pointer(newV, oldV){
				console.log(newV, oldV)
			}
		}
	}
</script>

