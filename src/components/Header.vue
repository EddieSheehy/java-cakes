<template>
  <div class="nav_bar">
    <ul>
      <li class = "link" display="block"><router-link to="/">Home</router-link></li>
      <li class = "link" display="block"><router-link to="/register">Register</router-link></li>
      <li class = "link" display="block"><router-link to="/login">Login</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Header"
}
</script>

<style scoped>
</style>
