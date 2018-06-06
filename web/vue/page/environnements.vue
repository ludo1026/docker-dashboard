<template>
  <div>
    <h1>Environnements</h1>
    <div class="tabs">
      <div class="tab-header">
        <ul class="nav nav-tabs">
          <li class="nav-item"
            v-for="(environnement, index) in environnements"
            v-bind:key="environnement.name"
          >
            <a class="nav-link"
              v-on:click="viewTab(index)"
              v-bind:class="{ 
                active: tab === index
              }"
            >
              {{environnement.name}}
            </a>
          </li>
        </ul>
      </div>
      <div class="tab-content"
        v-for="(environnement, index) in environnements"
        v-bind:key="environnement.name"
        v-bind:class="{ 
          displayed: tab === index
        }">
        <div class="col-xs-3"
          v-for="application in environnement.applications"
          v-bind:key="application.name">
          <div class="flat-card">
            <div class="flat-card-title">
              <h5>
                <span v-if="application.name === 'undefined'">Common</span>
                <span v-if="application.name !== 'undefined'">
                  {{application.name}}
                  <span v-if="application.version">
                  - {{application.version}}
                  </span>
                </span>
              </h5>
            </div>
            <div class="flat-card-bottom"
              v-for="container in application.containers"
              v-bind:key="container.Id">
              <span v-for="name in container.Names" v-bind:key="name">{{name}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>  
  </div>
</template>

<script>
module.exports = {
  props: {
    environnements: Array
  },
  data: function() { 
    return {
      tab: 0
    };
  },
  methods: {
    viewTab: function (tab) {
      this.tab = tab;
    }
  }
};
</script>

<style>
h1 {
  padding: 10px;
}

.tabs {
  padding: 10px;
}

.nav-tabs {
  border-bottom: 1px solid #dee2e6;
}

.nav {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  padding-left: 0;
  margin-top: 0;
  margin-bottom: 0;
  list-style: none;
}

.nav-item {
  display: list-item;
  text-align: -webkit-match-parent;
  margin-bottom: -1px;
  cursor: pointer;
}

.nav-tabs .nav-link {
  border: 1px solid transparent;
  border-top-left-radius: .25rem;
  border-top-right-radius: .25rem;
  display: block;
  padding: .5rem 1rem;
}

.nav-tabs .nav-link a {
  color: #007bff;
  text-decoration: none;
  background-color: transparent;
  -webkit-text-decoration-skip: objects;
}

.nav-tabs .nav-item.show .nav-link, .nav-tabs .nav-link.active {
  color: #495057;
  background-color: #fff;
  border-color: #dee2e6 #dee2e6 #fff;
}

.tab-content {
  background-color: white;
}

.tab-content {
  display: none;
}

.tab-content.displayed {
  display: block;
}

.flat-card {
  box-shadow: 1px 1px 1px rgba(0,0,0,0.25);
  margin: 10px;
  background-color: white;
}

.flat-card .flat-card-content{
  border: 1px solid #333333;
  padding: 10px;
  width: 200px;
}

.flat-card .flat-card-content h5 {
  font-size: 14px;
}

.flat-card .flat-card-bottom {
  border: 0 1px 1px 1px solid #333333;
  padding: 10px;
  width: 200px;
}

</style>