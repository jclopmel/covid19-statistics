<template>
	<v-app>
		<v-card
		flat
		tile
		fixed>
			<v-toolbar
			light>
				<v-row>
					<v-col class="d-flex align-center justify-center" cols="3">
					</v-col>
					<v-col class="d-flex align-center justify-center" cols="3">
					</v-col>
					<v-col
					class="d-flex align-center justify-center pb-0"
					cols="6"
					sm="3">
						<v-autocomplete
						style="max-height: 45px !important;"
						height="45"
						flat
						class="ma-0"
						v-model="pointer"
						:items="countries"
						append-icon="mdi-magnify"
        				placeholder="Search country"
						>
						</v-autocomplete>
					</v-col>
					<v-col class="d-flex align-center justify-center d-none d-sm-block" cols="3">
					</v-col>
				</v-row>
				
			</v-toolbar>
		</v-card>
		
		<v-content>
			<Graphs/>
		</v-content>
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
