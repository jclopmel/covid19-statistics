<template>
  <v-app>
    <v-content>
      <Graphs/>
    </v-content>
  </v-app>
</template>

<script>
import Graphs from './components/Graphs';

export default {
  name: 'App',

  components: {
    Graphs,
  },

  data: () => ({
    //
  }),
};
</script>
