<template>
  <div id="app">
    <nav class="navbar navbar-light" style="background-color: #f1d11f;">
      <router-link to="/" class="navbar-brand">HONEY STOCK</router-link>
      <div class="navbar-nav mr-auto">
        <ul class="nav flex-column">

        <li class="nav-item">
          <router-link to="/tutorials" class="nav-link">Stocks</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/add" class="nav-link">Add</router-link>
        </li>
        </ul>
      </div>
      <img src="./honey.png"  class="navbar-img">
    </nav>

    <div class="container mt-3">
      <router-view />

    </div>

  </div>
</template>
<style>

.navbar-img {
  width: 100px;
  height: auto;
  margin-left: auto;
  margin-right: 16px;
}

body {
  background-image:url("b.png");
  background-color: #cccccc;
}

</style>


<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App'
});
</script>
