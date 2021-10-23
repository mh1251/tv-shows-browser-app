<template>
  <div id="selectBox" class="d-flex flex-row justify-space-between col-12">
    <v-text-field 
      v-model="search" v-on:keyup="resultQuery" placeholder="Search for movies" class="col-6">
    </v-text-field>
    <v-select
      label="Choose Genre"
      :items="items"
      class="selectButton col-4 mx-1"
      id="genreSelect"
      v-model="key"
      @change="updateGenre(key)"
      filled
    >
    </v-select>
    <v-select
      label="Sort by"
      :items="sortCategories"
      class="selectButton col-4"
      id="sortSelect"
      v-model="sort"
      @change="sortMoviesBy(sort)"
      filled
    >
    </v-select>
  </div>
</template>


<script>
import { bus } from "../main";

export default {
  data: function () {
    return {
      search: "",
      key: "",
      sort: "",
      filteredMovies: [],
      items: [
        "Show All",
        "Action",
        "Comedy",
        "Drama",
        "Fantasy",
        "Mystery",
        "Romance",
        "Thriller",
        "Horror",
        "History",
        "Science-Fiction",
        "Adventure",
      ],
      sortCategories: 
      ['A-Z', 'Z-A', 'Highest rated', 'Lowest Rated'],
    };
  },
  props: {
    movies: Array,
    movieDatabase: Array
  },
  methods: {
    updateGenre: function (key) {
      if (key != "Show All") {
        key = this.key;
        this.filteredMovies = this.movieDatabase.filter(
          (movie) => movie.genres && movie.genres.includes(key)
        );
        bus.$emit("filteredMovies", this.filteredMovies);
      } else {
        this.filteredMovies = this.movieDatabase;
        bus.$emit("filteredMovies", this.movieDatabase);
      }
    },
  sortMoviesBy: function(sort){
    if (this.filteredMovies.length == 0) {
      this.filteredMovies = this.movieDatabase;
    }

    sort = this.sort;
    if(sort == 'A-Z'){
      this.movies = this.filteredMovies.sort((a, b) => (a.name > b.name) ? 1 : -1);
    }else if(sort == 'Z-A'){
      this.movies = this.filteredMovies.sort((a, b) => (a.name < b.name) ? 1 : -1);
    }else if(sort == 'Highest rated'){
      this.movies = this.filteredMovies.sort((a, b) => (a.rating.average < b.rating.average) ? 1 : -1);
    }else{
      this.movies == this.filteredMovies.sort((a, b) => (a.rating.average > b.rating.average) ? 1 : -1)
    }
  },

  resultQuery: function(){
      this.filteredMovies = this.movies.filter(movie => {
      return movie.name.toLowerCase().includes(this.search.toLowerCase())
      })
      bus.$emit("filteredMovies", this.filteredMovies)
      },
  },
};
</script>

<style scoped>
.selectButton {
  max-width: 300px;
}
</style>

