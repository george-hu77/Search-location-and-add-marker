<template>
	<div id="root">
		<div class="map" >
			<GoogleMap/>						
		</div>

		<div>
			<Table/>
		</div>
	</div>
</template>

<script>
	import Table from './components/Table'
	import GoogleMap from './components/GoogleMap.vue'
	export default {
		name:'App',
		components:{GoogleMap, Table}
	}
</script>


<style >
 .map{
	margin-left: 15px;
	
	float: center;	
 };


	
</style>