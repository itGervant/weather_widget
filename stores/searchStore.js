import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

const url = 'https://api.openweathermap.org/data/2.5/weather?appid=70e1ed322b02acbc57d443dd91065f3e&q=';

export const useSearchStore = defineStore('searchStore', () => {
  const loader = ref(false);
  const cities = ref([]);
  const activeTab = ref(2);
  const citiesInLocalStorage = localStorage.getItem('cities');
  
  

  const getLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const res = await fetch(`${url}&lat=${latitude}&lon=${longitude}&units=metric`);
        const data = await res.json();
        const formattedData = {
            ...data,
            main: {
                ...data.main,
                temp: data.main.temp.toFixed(0), 
                pressure: data.main.pressure.toFixed(1), 
                feels_like: data.main.feels_like.toFixed(0)
            }
        }
        cities.value.push(formattedData);
      //  cities.value.push(data);
      });
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  };

  if (citiesInLocalStorage) {
    cities.value = JSON.parse(citiesInLocalStorage)._value;
  } else {
    getLocation();
  }

  const getCities = async (searchCity) => {
    loader.value = true;
    const res = await fetch(`${url}${searchCity}&units=metric`);
    if (res.status < 400) {
        const data = await res.json();
    const formattedData = {
        ...data,
        main: {
            ...data.main,
            temp: data.main.temp.toFixed(0),
            pressure: data.main.pressure.toFixed(1), 
            feels_like: data.main.feels_like.toFixed(0)
        }
    }
    cities.value.push(formattedData);
    loader.value = false;

    } else {
      alert("Вы ввели некорректное название города, попробуйте еще раз")  
      loader.value = false;
      ;
      
    }
    
  };

  const setActiveTab = (id) => {
    activeTab.value = id;
  };

  const removeCity =(id) => {
    cities.value = cities.value.filter(i => i.id !== id)
}

  watch(
    () => cities,
    (state) => {
      localStorage.setItem('cities', JSON.stringify(state));
    },
    { deep: true }
  );

  return { loader, cities, activeTab,  citiesInLocalStorage, getCities, setActiveTab, removeCity };
});
