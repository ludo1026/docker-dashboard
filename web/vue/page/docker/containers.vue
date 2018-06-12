<template>
  <div>
    <h5>Containers</h5>
    <div class="card">
      <div class="row row-head hidden-xs">
        <div class="col-sm-3 cell">Name</div>
        <div class="col-sm-2 cell">Id</div>
        <div class="col-sm-2 cell">Image</div>
        <div class="col-sm-2 cell">State</div>
        <div class="col-sm-3 cell">Actions</div>
      </div>
      <div class="row row-body"
        v-for="container in containers"
        v-bind:key="container.Id">
        
        <div class="col-xs-12 hidden-sm hidden-md hidden-lg cell cell-sep">Container</div>

        <!-- Container name -->
        <div class="col-xs-5 hidden-sm hidden-md hidden-lg cell">Container Name</div>
        <div class="col-xs-7 col-sm-3 cell cell-head"><span>{{container.name}}</span></div>

        <!-- Container name -->
        <div class="col-xs-5 hidden-sm hidden-md hidden-lg cell">Container Id</div>
        <div class="col-xs-7 col-sm-2 cell">{{container.Id | truncate(13,'')}}</div>
        
        <!-- Container name -->
        <div class="col-xs-5 hidden-sm hidden-md hidden-lg cell">Image</div>
        <div class="col-xs-7 col-sm-2 cell">{{container.Image | truncate(25,'')}}</div>
        
        <!-- State -->
        <div class="col-xs-5 hidden-sm hidden-md hidden-lg cell">State</div>
        <div class="col-xs-7 col-sm-2 cell">
          <container-state v-bind:state="container.State" />
        </div>
        
        <!-- Actions -->
        <div class="col-xs-5 hidden-sm hidden-md hidden-lg cell">Container Name</div>
        <div class="col-xs-7 col-sm-3 cell">
          <a href="#" class="btn btn-start"
            v-on:click="start(container.Id)"
            v-if="container.State !== 'running'">
            <i class="fas fa-play"></i> Start
          </a>
          <a href="#" class="btn btn-stop"
            v-on:click="stop(container.Id)"
            v-if="container.State === 'running'">
            <i class="fas fa-stop"></i> Stop
          </a>
          <a href="#" class="btn btn-remove"
            v-on:click="remove(container.Id)">
            <i class="far fa-trash-alt"></i> Remove
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
module.exports = {
  components: {
    containerState: httpVueLoader('vue/page/docker/components/container/state.vue'),
  },
  props: [
    'containers'
  ],
  data: function() {
    return {
      who: 'world'
    }
  },
  methods: {
    start: function (containerId) {
      axios.get(`containers/`+containerId+'/start')
        .then(response => {
          console.log('container start:',response.data);
        })
        .catch(e => {
          this.errors.push(e);
        })
    },
    stop: function (containerId) {
      axios.get(`containers/`+containerId+'/stop')
        .then(response => {
          console.log('container stop:',response.data);
        })
        .catch(e => {
          this.errors.push(e);
        })
    },
    remove: function (containerId) {
      axios.get(`containers/`+containerId+'/remove')
        .then(response => {
          console.log('container remove:',response.data);
        })
        .catch(e => {
          this.errors.push(e);
        })
    }
  }
}
</script>

<style>
</style>