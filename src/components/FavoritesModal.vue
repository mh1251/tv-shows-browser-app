<template>
  <v-row justify="flex-end">
    <v-col cols="auto">
      <v-dialog
        transition="dialog-bottom-transition"
        max-width="600"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="red"
            text
            v-bind="attrs"
            v-on="on"
          >Favorites: {{ favMovies.length }}</v-btn>
        </template>
        <template v-slot:default="dialog">
          <v-card class="favMovieCard">
            <v-toolbar class="d-flex justify-end stickyToolBar" color="red" dark>
                <h3>FAVORITE MOVIES</h3>
                 <v-card-actions>
                    <v-btn
                        text
                        @click="dialog.value = false"
                    >X</v-btn>
                 </v-card-actions>
            </v-toolbar>
              <div class="text-h2 pa-12" 
              v-for="movie in favMovies"
              :key="movie.id">
             <h5 style="font-size: 0.5em">{{movie.name}}</h5>
              <img :src="movie.image.medium" alt="">
              <v-card-actions>
                    <v-btn
                        text
                        @click="removeFavMovie(movie.id)"
                    >Remove from favs</v-btn>
                 </v-card-actions>
              </div>
          </v-card>
        </template>
      </v-dialog>
    </v-col>
  </v-row>
</template>


<script>
import { bus } from "../main";

export default {
  name: "FavoritesModal",
  data() {
    return {
      buttonText: 'Remove from favs' 
    };
  },
  methods: {
    removeFavMovie: function(id){
     let removedMovie = this.favMovies.find(x => x.id === id);
     this.favMovies = this.favMovies.filter(x => x.id !== id);
     bus.$emit("removedMovieFromFavorites", removedMovie);
    }
  },
  props: {
    favMovies: []
  },
  components: {
  },
};
</script>

<style scoped>
.stickyToolBar{
    position: sticky;
    max-width:auto;
}

.favMovieCard {
    max-width: 600px;
    text-align: center;
    vertical-align: center;
}
</style>
