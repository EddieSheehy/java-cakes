<template>
  <div class="px-4 py-5 my-5 text-center">
    <router-link to="/"><img alt="Java Cake logo" src="../assets/logo.png"></router-link>
    <h1 class="display-5 fw-bold">Java Cakes</h1>
    <div class="col-lg-6 mx-auto">
      <p class="lead mb-4">
        Find your accommodation with Java Cakes, today.
      </p>
      <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
        <button class="btn btn-primary btn-success btn-lg px-4 gap-3" @click="move('register')">Register</button>
        <button class="btn btn-primary btn-success btn-lg px-4 gap-3" @click="move('login')">Login</button>
      </div>
      <div class="b-example-divider"><hr></div>
      <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
        <button class="btn btn-outline-secondary btn-lg px-4" @click="move('homepage')">Continue as Guest</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  methods:{
    move(pageName){
      const path = "/" + pageName;
      this.$router.push(path);
    }
  }
}
</script>

<style scoped>

</style>