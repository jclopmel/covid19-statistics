<template>
  	<div class="home">
		<Graphs/>
	</div>
</template>

<script>
// @ is an alias to /src
import Graphs from '@/components/Graphs.vue'

export default {
  name: 'Home',
  components: {
    Graphs
  }
}
</script>
