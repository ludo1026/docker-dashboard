<template>
  <div>
    <h5>Images</h5>
    <div class="card">
      <div class="row row-head hidden-xs">
        <div class="col-sm-3 cell">Name</div>
        <div class="col-sm-2 cell">Id</div>
        <div class="col-sm-4 cell">Parent image</div>
        <div class="col-sm-3 cell">Actions</div>
      </div>
      <div class="row row-body"
        v-for="image in images"
        v-bind:key="image.Id">

        <div class="col-xs-12 hidden-sm hidden-md hidden-lg cell cell-sep">Image</div>

        <!-- Name -->
        <div class="col-xs-5 hidden-sm hidden-md hidden-lg cell">Name</div>
        <div class="col-xs-7 col-sm-3 cell cell-head"><span v-for="repoTag in image.RepoTags" v-bind:key="repoTag">{{repoTag}}</span>&nbsp;</div>
        
        <!-- Id -->
        <div class="col-xs-5 hidden-sm hidden-md hidden-lg cell">Id</div>
        <div class="col-xs-7 col-sm-2 cell">{{image.Id | truncate(13,'')}}</div>
        
        <!-- Parent id -->
        <div class="col-xs-5 hidden-sm hidden-md hidden-lg cell">Parent</div>
        <div class="col-xs-7 col-sm-4 cell">{{image.ParentId | truncate(13,'')}}&nbsp;</div>
        
        <!-- Actions -->
        <div class="col-xs-5 hidden-sm hidden-md hidden-lg cell">Action</div>
        <div class="col-xs-7 col-sm-3 cell">
          <a href="#" class="btn" v-on:click="remove(image.Id)">
            <i class="far fa-trash-alt"></i> Remove
          </a>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
module.exports = {
  props: [
    'images'
  ],
  data: function() {
    return {
      who: 'world'
    }
  },
  methods: {
    remove: function (imageId) {
      axios.get(`images/`+imageId+'/remove')
        .then(response => {
          console.log('image remove:',response.data);
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