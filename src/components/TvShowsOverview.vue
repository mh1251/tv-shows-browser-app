<template>
  <v-container>
    <FavoritesModal :movies="this.movies" :favMovies="this.favMovies" />
    <div id="nav-bar" class="d-flex my-2 col-12">  
    <SelectionSection :movies="this.movies" :movieDatabase="this.allMovies" class="col-5"></SelectionSection>
    </div>
    <v-row>
      <TvShowCard
        v-for="movie in this.movies"
        :movie="movie"
        :key="movie.id"
        @fav-movie-altered="alterFavMovie"
      />
    </v-row>
  </v-container>
</template>

<script>
import TvShowCard from "./TvShowCard.vue";
import FavoritesModal from './FavoritesModal.vue';
import SelectionSection from './SelectionSection.vue';
import { bus } from "../main";

export default {
  name: "TvShowsOverview",
  data() {
    return {
      favMovies: [],
      buttonText: 'Add to favs',
      movieDatabase: this.allMovies
    };
  },
  props: {
    movies: Array,
    allMovies: Array
  },
  methods: {
    alterFavMovie: function (movie) {
      // Search for movie in favs
      let movieFromFavorites = this.favMovies.find(x => x.id == movie.id);

      // Get movie index from list of movies
      let movieIndexFromListOfMovies = this.movies.findIndex(x => x.id == movie.id);

      // Get movie from list of movies
      let movieFromListOfMovies = this.movies.find(x => x.id == movie.id);

      // If can't find movie in list of favorites
      if (movieFromFavorites === undefined) {
        // add the movie to the list of favorites
        this.favMovies.push(movie);
        // set movie's favorite flag to true
        movieFromListOfMovies.isFavorite = !movieFromListOfMovies.isFavorite;
        this.$set(this.movies, movieIndexFromListOfMovies, movieFromListOfMovies);
      // If can find movie in favorites
      } else {
        // find the movie and remove him from the favorites list
        let index = this.favMovies.map(x => {
          return x.id
        }).indexOf(movie.id);
        this.favMovies.splice(index, 1);
        // set movie's favorite flag to false
        movieFromListOfMovies.isFavorite = !movieFromListOfMovies.isFavorite;
        this.$set(this.movies, movieIndexFromListOfMovies, movieFromListOfMovies);
      }
    },
  },
  
  components: {
    TvShowCard,
    FavoritesModal,
    SelectionSection
  },
  created() {
    bus.$on("removedMovieFromFavorites", (movie) => {
      // Get movie index from list of movies
      let movieIndexFromListOfMovies = this.movies.findIndex(x => x.id == movie.id);

      // Get movie from list of movies
      let movieFromListOfMovies = this.movies.find(x => x.id == movie.id);

      // Unfavorite
      movieFromListOfMovies.isFavorite = !movieFromListOfMovies.isFavorite;

      this.$set(this.movies, movieIndexFromListOfMovies, movieFromListOfMovies);
      this.favMovies = this.favMovies.filter(x => x.id !== movie.id);
    }),
    bus.$on("filteredMovies", (filteredMovies) => {
      this.movies = filteredMovies;
    })
  }
};
</script>

<style scoped>
.favsBtn {
  display: inline-block;
  border: 1px solid rgb(156, 151, 151);
  padding: 10px;
  border-radius: 5px;
}
</style>
