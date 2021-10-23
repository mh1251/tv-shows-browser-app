<template>
  <v-app>
    <router-view :key="$route.fullPath" :movies="this.movies" :allMovies="this.movies" ></router-view>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    api : 'http://api.tvmaze.com/shows',
    movies: [],
    allMovies: []
  }),
  mounted(){
    fetch(this.api)
      .then(stream => stream.json())
      .then(movies => movies.map(movie => Object.assign({}, movie, { isFavorite: false })))
      .then(data => this.movies = data)
      .catch(error => console.error(error))

    fetch(this.api)
      .then(stream => stream.json())
      .then(allMovies => allMovies.map(movie => Object.assign({}, movie, { isFavorite: false })))
      .then(data => this.movies = data)
      .catch(error => console.error(error))
  }
};
</script>
