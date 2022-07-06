<template>
	<div style="display: flex" id="root">
		<div  class="container">
			<Search/>
			<List/>
		</div>
		<div class="map">
			<GoogleMap/>
		</div>
	</div>
</template>

<script>
	import Search from './components/Search'
	import List from './components/List'
	import GoogleMap from './components/GoogleMap.vue'
	export default {
		name:'App',
		components:{Search,List,GoogleMap}
	}
</script>


<style >
 .container{
	width : 1200px;
	margin: left;

 }
 .map{
	width : 600px;	
 }

	
		
</style>