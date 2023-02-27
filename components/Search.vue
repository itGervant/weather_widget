<template>
  <div>
    <Loader v-if="searchStore.loader" />
    <div v-else>
      <div class="item" v-for="city of searchStore.cities" :key="city.id" :city="city" :isSearch="true"
        :draggable="draggable" @dragstart="startDrag($event, city)" @drop="onDropItem($event, city, searchStore.cities)"
        @dragover.prevent @dragenter="onDragEnter($event)" @dragleave="onDragLeave($event)" @dragend="onDragEnd($event)">
        <a class="icon" @click="draggable = !draggable">
          <font-awesome-icon icon="fa-solid fa-bars" />
        </a>
        <p class="title">{{ city.name }}</p>
        <a class="icon-delete" @click="searchStore.removeCity(city.id)">
          <font-awesome-icon icon="fa-solid fa-trash" />
        </a>
      </div>
    </div>
    <form @submit.prevent="clearInput(searchCity)">
      <h4>Add city</h4>
      <input type="text" class="search-input" placeholder="input city" v-model="searchCity" />
    </form>
  </div>
</template>

<script setup>

import { ref } from 'vue';
import { useSearchStore } from '../stores/searchStore';
import Loader from '../components/Loader.vue';


const searchStore = useSearchStore()
const searchCity = ref('')
const draggable = ref(false)
const props = defineProps({
  city: {
    type: Object,
    requred: true,
    default: () => { }
  },
})



const startDrag = (event, city) => {
  event.dataTransfer.setData('cityId', city.id);
};



const onDropItem = (event, city, list) => {
  const movieId = event.dataTransfer.getData('cityId');
  const draggedIndex = list.findIndex(city => city.id === Number(movieId));
  const droppedIndex = list.indexOf(city);

  if (draggedIndex > -1) {
    const draggedMovie = list[draggedIndex];
    list.splice(draggedIndex, 1);
    list.splice(droppedIndex, 0, draggedMovie);
  }
};

const onDragEnter = (event) => {
  event.target.classList.add('drag-enter');
};

const onDragLeave = (event) => {
  event.target.classList.remove('drag-enter');
};

const onDragEnd = (event) => {
  event.target.classList.remove('drag-enter');
};



const clearInput = () => {
  searchStore.getCities(searchCity.value)
  searchCity.value = ''
}



</script>

<style scoped>
.search-input {
  border: 1px solid black;
  width: 180px;
  height: 40px;
  padding: 0 10px;

  border-radius: 10px;
}



.item {
  background-color: lightgray;
  margin: 10px auto;
  border-radius: 3px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 30px;
}



.item>*:not(:last-child) {
  margin-right: 10px;
}

.item> :first-child {
  margin-left: 10px;
}

.item> :last-child {
  margin-left: auto;
  margin-right: 10px;
}
</style>
