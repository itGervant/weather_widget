<template>
    <div class="city">
      <div class="gear">
        <p><h4>{{ city.name }} , {{ city.sys.country }}</h4></p>
        <div class="main"><img class="city-img" :src="'http://openweathermap.org/img/wn/' + city.weather[0]['icon'] + '@2x.png'">
         <h1>{{ city.main.temp }}&#176C</h1> 
        </div>
        <p>Feels like: {{ city.main.feels_like }}&#176C  </p>
        <p>Wind: {{ city.wind.speed }}m/s</p>
        <p>Pressure: {{ city.main.pressure }} Pa</p>
        <p>Humidity: {{ city.main.humidity }}%</p>
        <p>Visibility: {{ city.visibility }} m</p>   
      </div>
    </div>
</template>



<script setup>
import { useSearchStore } from '../stores/searchStore';


const searchStore = useSearchStore();

const props = defineProps({
    city: {
        type: Object,
        requred: true,
        default: () => {}
    },

})

</script>

<style lang="css" scoped>
.city {
  display: flex;
  align-items: center;
  margin: 0 auto;
  border: 2px solid #efefef;
  padding: 10px;
  border-radius: 10px;
}

p {
  margin: 0 auto;
}
.city-accept {
  margin-right: 10px;
}
.main {
  display: flex;
  align-items: center;
 
}


</style>