<template>
  <div class="app">
    <div class="cities" v-if="searchStore.activeTab === 2">
      <div class="header">
        <h3>Weather widget</h3>
        <a @click="setTab(1)">
          <font-awesome-icon icon="fa-solid fa-gear" />
        </a>
      </div>
      <City v-for="city in searchStore.cities" :key="city.id" :city="city" />
    </div>
    <div class="search" v-else>
      <div class="header">
        <h4>Settings</h4>
        <a @click="setTab(2)">
          <font-awesome-icon icon="fa-solid fa-xmark" />
        </a>
      </div>
      <Search />
    </div>
  </div>
</template>

<script setup>
import Search from './components/Search.vue'
import City from './components/City.vue'
import { useSearchStore } from './stores/searchStore';

const searchStore = useSearchStore();

const setTab = (id) => {
  searchStore.setActiveTab(id)
}
</script>


<style>

html {
  margin-right: calc(-1 * (100vw - 100%));
 
}

.app {
  max-width: 200px;
  margin: auto;
  
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(to right, #98fcff, #36ebf1);
  padding: 0 10px;
  border-radius: 10px;
  height: 40px;

}


</style>