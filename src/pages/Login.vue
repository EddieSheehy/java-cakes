<template>
  <div class="container">
    <h1>Login to continue</h1>
    <div class="form-group">
      <label for="exampleInputEmail1">Email address</label>
      <input type="email" v-model="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
      <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small></div>
    <div class="form-group">
      <label for="exampleInputPassword1">Password</label>
      <input type="password" v-model="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
    </div>
    <button @click="login" class="btn btn-primary">Login</button>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: ""
    }
  }
}
</script>

<style scoped>

</style>