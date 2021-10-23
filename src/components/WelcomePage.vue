<template>
  <v-container
    fluid
    ma-0
    pa-0
    style="background-image: 'src\assets\photo-1489599849927-2ee91cede3ba.jpg'"
  >
    <v-col id="container" fluid>
      <spinner-component></spinner-component>
      <h1>MOVIES AND TV SHOWS BROWSER</h1>
      <h3>BEST PLACE TO FIND YOUR FAVORITE SERIES AND FILMS</h3>
      <v-btn style="font-size: 0.5em" id="button">
        <router-link to="/tv-shows-overview" style="text-decoration: none; color: black">Go to tv shows overview</router-link>
      </v-btn>
    </v-col>
  </v-container>
</template>

<script>
export default {
  name: "WelcomePage",
  data() {},
};
</script>
  
<style>
#container {
  font: Arial;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow-y: auto;
  font-size: 2em;
  height: 100vh;
  width: 100%;
  margin: 0;
  padding: 0;
  background: url("../assets/photo-1489599849927-2ee91cede3ba.jpg");
}

#button:hover {
  background: rgb(235, 57, 57);
  transition: ease-in-out 0.2s;
}
</style>