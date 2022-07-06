<template>
  <div>
    <div style="margin-bottom: 16px; margin-top: 16px">
      <a-button style ="margin-left : 15px" type="primary" :disabled="!hasSelected"  @click="handleDelete">
        Delete Selected
      </a-button>
      <span style="margin-left: 8px">
        <template v-if="hasSelected">
          {{ `Selected ${selectedRowKeys.length} locations` }}
        </template>
      </span>

    </div>
    <a-table style ="margin-left : 15px; width:500px"
      :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      :columns="columns"
      :data-source="locations"   
      :rowKey="(record,index)=>{return index}"
    />
  </div>

</template>
<script>
import {nanoid} from 'nanoid'
const columns = [
  {
    title: 'Select All Locations',
    dataIndex: 'place',
  },

];



export default {
  data() {
    return {
      value:'',
      location:{},
      locations:[

      ],
      columns,
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
    };
  },
  mounted() {
    this.$bus.$on('getLocations',(value) => {
      this.value = value.toString()
      this.location = {key: nanoid() , place : value}
    });
	},

  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0;
    },
  },
  
  methods: {  

    addLocation(value){

      this.locations.unshift(value)
    },
    handleDelete(selectedRowKeys) {
      selectedRowKeys = this.selectedRowKeys

      this.$bus.$emit('deleteMarker',selectedRowKeys)
      for (let i of selectedRowKeys){
           this.locations.splice(i,1)
      }
      this.selectedRowKeys = [] 
    },


    onSelectChange(selectedRowKeys) {
  
      this.selectedRowKeys = selectedRowKeys;
  //    console.log('selectedRowKeys changed111: ', this.selectedRowKeys);
    },
    
  },

  watch:{
    value:{
      handler(newvalue, oldvalue){

        this.addLocation(this.location)
        
      }
    }
  }


  
};
</script>
