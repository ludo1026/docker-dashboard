<template>
  <div class="environnements-page container-page">
    <div class="row">
      <div class="col-xs-12">
        <h1><span class="fa fa-server"></span> Environnements</h1>
      </div>
      <div class="col-xs-12">
        <div class="description">
          Applications et conteneurs Docker par environnement / network.
        </div>
      </div>
      <div class="col-xs-12">  
        <div class="environnements-wrapper">
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
                        <b>{{application.name}}</b>
                      </span>
                      <span v-if="application.version !== 'undefined'">
                        <br/>{{application.version}}
                      </span>
                    </h5>
                  </div>
                  <div class="flat-card-bottom"
                    v-for="container in application.containers"
                    v-bind:key="container.Id"
                    v-if="container.State === 'running' && container.url">
                    <ul>
                      <li>
                        <a v-bind:href="container.url.href" target="_blank">
                          {{container.url.text}}
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div class="flat-card-bottom"
                    v-for="container in application.containers"
                    v-bind:key="container.Id"
                    v-bind:class="{ 
                      'running-container': container.State === 'running',
                      'exited-container': container.State === 'exited'
                    }">
                    <span>
                      <span class="fa icon-font"
                        v-bind:class="{
                          'fa-times exited-font': container.State === 'exited',
                          'fa-check running-font': container.State === 'running'
                        }"></span>
                      <span class="cell-head">
                        {{container.name}}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>  
      </div>
      <div class="col-xs-12">
        <h2><span class="fa fa-light-bulb"></span> Indications</h2>
        <div class="description">
          Les conteneurs Docker sont liés à une application via les labels suivants:
          <ul>
            <li><code>application.name</code>: Nom de l'application</li>
            <li><code>application.version</code>: Version de l'application</li>
          </ul>
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

.environnements-page h1 {
  padding: 10px;
  margin-left: 10px;
  background-size: 50px;
  height: 50px;
  line-height: 50px;
  font-size: 30px;
  padding-top: 20px;
  letter-spacing: 1px;
  font-weight: 700;
  border-bottom: 1px solid lightgray;
  padding-bottom: 0;
}
.environnements-page h1 .fa {
  font-size: 30px;
}

.environnements-page h2 {
  margin-top: 30px;
  padding: 30px 10px;
  margin-left: 10px;
  background-size: 50px;
  height: 50px;
  line-height: 50px;
  font-size: 18px;
  padding-top: 20px;
  letter-spacing: 1px;
  font-weight: 700;
  border-bottom: 1px solid lightgray;
  padding-bottom: 0;
  color: gray;
}
.environnements-page h2 .fa {
  font-size: 30px;
}

.environnements-wrapper {
  padding: 20px 0;
}

.tabs {
  padding: 10px;
}

.nav-tabs {
  border-bottom: 1px solid #bbc4d1;
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
  font-size: 18px;
  color: #495057;
  font-weight: bold;
}

.nav-tabs .nav-link a {
  color: #007bff;
  text-decoration: none;
  background-color: transparent;
  -webkit-text-decoration-skip: objects;
}

.nav-tabs .nav-item.show .nav-link, .nav-tabs .nav-link.active {
  color: #000;
  background-color: #fff;
  border-color: #bbc4d1 #bbc4d1 #fff;
}

.tab-content {
  display: none;
  padding: 12px 0;
}

.tab-content.displayed {
  display: block;
}

.flat-card {
  margin: 10px;
  background-color: white;
}

.flat-card .flat-card-title {
  border: 1px solid #bbc4d1;
  padding: 10px;
}

.flat-card .flat-card-title h5 {
  font-size: 14px;
  padding: 0;
}

.flat-card .flat-card-bottom {
  border: 1px solid #bbc4d1;
  border-top: 0;
  padding: 10px;
  font-size: 18px;
}

.flat-card li {
  margin-left: 20px;
}

.flat-card a {
  font-size: 16px;
}

.running-container {
  background-color: #a7ffbc;
}
.exited-container {
  background-color: #ffc3c8;
}
.icon-font {
  font-size: 18px;
}
.running-font {
  color: #179a35;
}
.exited-font {
  color: #d01626;
}

.description {
  display: block;
  color: gray;
  padding: 20px 20px 10px 20px;
  font-size: 16px;
}
.description ul {
  padding: 10px 20px 10px 20px;
}
.description li {
  padding: 5px;
  font-size: 16px;
}
.description code {
  background-color: #efefef;
  border-radius: 2px;
  padding: 2px 8px;
  font-size: 16px;
}

</style>