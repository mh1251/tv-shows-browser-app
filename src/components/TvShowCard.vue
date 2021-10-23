<template>
  <v-col col="12" md="4" sm="12">
    <v-card class="mx-auto" max-width="400" min-width="200" height="700px">
      <v-img
        class="movieImage white--text align-end"
        height="60%"
        :src="movie.image.original"
      >
        <v-card-title style="background-color: rgba(255,0,0,0.6)">
          {{movie.name.toUpperCase()}}
        </v-card-title>
      </v-img>

      <v-card-text class="text--primary d-flex flex-column">
        <div id="rating" class="my-2">RATING: {{movie.rating.average}}</div>
        <div style="font-size: 2em" class="my-2">{{ movie.name.toUpperCase() }}</div>
        <div v-html="movie.summary" class="my-2"></div>
      </v-card-text>


      <v-card-actions>
        <div class="buttons">
          <v-btn class="cardButton mx-2" style="background=white"  elevation="1" @click="alterFavMovie" text> 
            <span v-if="movie.isFavorite == false || movie.isFavorite == undefined">Add to Favs</span>
            <span v-else>Remove from favs</span>
          </v-btn>
          <v-btn class="cardButton" style="background=white" elevation="1" text> 
            <a style="text-decoration:none; color:black" v-bind:href="movie.officialSite" target="_blank">READ MORE</a> 
            </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-col>
</template>


<script>

export default {
  name: "TvShowCard",
  data() {
    return {
    };
  },
  props: {
    movie: Object
  },
  created(){
    this.hideText()
  },
 updated() {
    this.hideText()
  },
  methods: {
    hideText: function () {
      let cardText = this.movie.summary;
      let maxCharacters = 200;
      if (cardText.length > maxCharacters) {
        cardText = cardText.substr(0, maxCharacters);
        let last = cardText.lastIndexOf(".");
        cardText = cardText.substr(0, last + 1);
        this.movie.summary = cardText;
      }
    },
    alterFavMovie: function () {
      this.$emit("fav-movie-altered", this.movie);
    }
  },
};
</script>


<style scoped>
.cards {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: justify;
  padding-top: 5px;
}

.buttons {
  position: absolute;
  bottom: 10px;
  left: 0px;
}


.cardButton:hover{
  background: red;
  color: white;
  transition: 0.2s ease-in
}

#rating {
  font-size: 1.2em;
  font-weight: 700;
}
</style>