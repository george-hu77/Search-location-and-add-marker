<template>
  <div>
    
    <div>
      <h2>Search Location and Add Marker</h2>

      <label>               
        <gmap-autocomplete size = "39px"  
          :value="address" 
          @input="value = $event.target.value" 
          @place_changed="initMarker" 
          @keyup.enter="addLocationMarker"   
          >
          
        </gmap-autocomplete>     
        <a-button type="primary" style="margin-left : 15px "  @click="addLocationMarker" >Add</a-button>  
        <a-button  style="margin-left : 15px; margin-bottom: 10px " @click="currentLocation" >Current Location</a-button>  

      </label>
      <br/>

      <span >
       Time Zone and Local Time : {{this.currentZone}}  {{this.localTime}}
      </span>
      
    </div>
    <br>
    <gmap-map
        :zoom="12"    
        :center="center"
        style="width:500px;  height: 300px;"

      >
      <gmap-marker
        :key="index"
        v-for="(m, index) in locationMarkers"
        :position="m.position"
        @click="center=m.position"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>
 
<script>
import axios from 'axios'
import moment from 'moment-timezone'

export default {
  name: "AddGoogleMap",
  data() {
    return {
      nowTime: new Date(), // current time
      currentZone:'',
      localTime:'',
      address:'',
      selectedRowKeys: [],
      center: { 
        lat: 39.7837304,
        lng: -100.4458825
      },
      locationMarkers: [],
      locPlaces: [],
      existingPlace: null
    };
  },
  
  mounted() {
    this.locateGeoLocation();
    this.nowTime = this.nowTime.toISOString()
    console.log(this.nowTime)
    this.$bus.$on('deleteMarker',(selectedRowKeys) => {
      this.selectedRowKeys = selectedRowKeys
    })
  },
 
  methods: {
    timeZone(lat,lng) {
      var config = {
        method: 'get',
        url: `https://maps.googleapis.com/maps/api/timezone/json?location=${lat}%2C${lng}&timestamp=1331161200&key=AIzaSyAarhLcO0N0o-bYIKddM-evmCkJNt1HxJo`,
        headers: { }
      };
      var that = this

      axios(config)
      .then((response)=>{
          console.log(response.data.timeZoneId);         
           that.currentZone = response.data.timeZoneId                      
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    initMarker(loc) {
      this.existingPlace = loc;
    },

    deleteMarker(arr){
      for (let i of arr){          
        this.locationMarkers.splice(i,1)
        
      }              
    },

    addLocationMarker(event) {
      if (this.existingPlace) {
        const marker = {
          lat: this.existingPlace.geometry.location.lat(),
          lng: this.existingPlace.geometry.location.lng()
        };
        this.locationMarkers.push({ position: marker });
        this.locPlaces.push(this.existingPlace);
        this.center = marker;

        this.timeZone(marker.lat, marker.lng)
       
        this.$bus.$emit('getLocations',this.existingPlace.formatted_address);  
    
      }
    },
    locateGeoLocation: function() {
      navigator.geolocation.getCurrentPosition(res => {
        this.center = {
          lat: res.coords.latitude,
          lng: res.coords.longitude
        };
      });
    },

    currentLocation(){
       this.locateGeoLocation();
        alert('Current Location is: latitude '+ this.center.lat + '; ' + 'longitude ' + this.center.lng)
       //console.log(this.center.lat, this.center.lng);

    }

    
  },
  watch:{
    selectedRowKeys:{
      handler(newvalue, oldvalue){      
        this.deleteMarker(this.selectedRowKeys)        
      }
    },
    currentZone:{
      handler(newvalue, oldvalue){      
      //console.log(this.nowTime.replace(/\..*/, 'Z'))
        var jun = moment(this.nowTime.replace(/\..*/, 'Z'));
        this.localTime = jun.tz(this.currentZone).format('ha z')

      }
    },
  } 
}
</script>
       