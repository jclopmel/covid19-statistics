<template>
	<v-app>
		<v-card
		flat
		tile
		fixed>
			<v-toolbar
			light>
				<v-row no-gutters>
					<v-col class="d-flex align-center justify-center" cols="2">
						<img
						height="46px"
						src="/img/logo.png"
						/>
					</v-col>
					<v-col class="d-flex align-center justify-center" cols="4">
					</v-col>
					<v-col
					class="align-center justify-center pb-0"
					cols="3"
					>

					</v-col>
					<v-col class="d-flex align-center justify-end" cols="3">

						<v-autocomplete
						style="max-height: 45px !important;"
						height="45"
						flat
						class="ma-0 d-none d-sm-block"
						v-model="pointer"
						:items="countries"
						append-icon="mdi-magnify"
        				placeholder="Search country"
						>
						</v-autocomplete>

						<v-speed-dial
						v-model="searchFab"
						class="d-block d-sm-none"
						direction="left"
						transition="'slide-x-reverse-transition"
						>
							<template v-slot:activator>
								<v-btn
								icon
								v-model="searchFab"
								color="teal darken-1"
								dark
								fab
								>
									<v-icon v-if="searchFab">mdi-close</v-icon>
									<v-icon v-else>mdi-magnify</v-icon>
								</v-btn>
							</template>
							<v-autocomplete
							@click.stop="searchFab = true"
							style="max-height: 45px !important; width: 120px !important;"
							width="120px"
							flat
							class="ma-0"
							v-model="pointer"
							:items="countries"
	        				placeholder="Search country"
							>
							</v-autocomplete>
						</v-speed-dial>
					</v-col>
				</v-row>
				
			</v-toolbar>
		</v-card>
		
		<v-content>
			<Graphs/>
		</v-content>

		<v-footer
		elevation="3"
		color="white"
		class="mt-3">

				<v-spacer></v-spacer>
				<div>Datos obtenidos de <a class="text-muted" href="https://www.medrxiv.org/" target="_blank">www.medrxiv.org</a></div>
		</v-footer>
	</v-app>
</template>

<script>
import Graphs from './components/Graphs';
import { mapState, mapActions } from 'vuex';

export default {
	name: 'App',
	components: {
		Graphs,
	},
	data: () => ({
		searchFab: false
	}),
	computed:{
		...mapState({
			countries: state => state.stats.countries
		}),
		pointer:{
			get(){
				return this.$store.state.stats.pointer
			},
			set(v){
				this.$store.commit("stats/resetVariables")
				this.$store.commit("stats/setPointer", v)
				this.recalculateStats();
			}	
		}
	},
	methods:{
		...mapActions({
			recalculateStats: "stats/recalculateStats"
		})
	},
};
</script>
