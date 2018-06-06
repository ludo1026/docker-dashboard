<template>
  <div class="row">
    <div class="col-sm-12">
      <div class="page-header">
        <a class="btn"
          v-on:click="view('environnements')">
          Environnements
        </a>
        <a class="btn"
          v-on:click="view('docker')">
          Docker
        </a>
      </div>
      <docker
        v-if="page === 'docker'"
        v-bind:images='images'
        v-bind:containers='containers'
        v-bind:composes='composes'
        v-bind:networks='networks'
        v-bind:volumes='volumes'
        v-bind:events='events'
        v-bind:logs='logs'
      ></docker>
      <environnements
        v-if="page === 'environnements'"
        v-bind:environnements='environnements'
      ></environnements>
    </div>
  </div>
</template>

<script>
module.exports = {
  components: {
    docker: httpVueLoader('vue/page/docker.vue'),
    environnements: httpVueLoader('vue/page/environnements.vue'),
  },
  data() { 
    return {
      page: 'environnements',
      errors: [],
      images: [],
      containers: [],
      composes: [],
      environnements: [],
      networks: [],
      volumes: [],
      events: [],
      logs: []
    }
  },
  created() {
    axios.get(`all`)
    .then(response => {
      console.log(response.data);
      this.images = response.data.images;
      this.containers = response.data.containers;
      this.networks = response.data.networks;
      this.volumes = response.data.volumes;
      this.composes = response.data.composes;
      this.environnements = response.data.environnements;
    })
    .catch(e => {
      this.errors.push(e);
    });
    this.$socket = socket;
    socket.on('connect', (data) => {
      this.isConnected = true;
    });
    socket.on('disconnect', (data) => {
      this.isConnected = false;
    });
    socket.on('images', (data) => {
      this.images = data;
    });
    socket.on('containers', (data) => {
      this.containers = data;
    });
    socket.on('composes', (data) => {
      this.composes = data;
    });
    socket.on('networks', (data) => {
      this.networks = data;
    });
    socket.on('volumes', (data) => {
      this.volumes = data;
    });
    socket.on('environnements', (data) => {
      this.environnements = data;
    });
    socket.on('docker', (data) => {
      this.events.push(data);
    });
    socket.on('log', (data) => {
      data = replaceTerminalCharacters(data);
      this.logs.push(data);
    });
  },
  methods: {
    view: function (page) {
      this.page = page;
    }
  }
}
</script>

<style>
</style>