<template>
  <div class="nav">
      <li class = "link" display="block"><router-link to="/">Home</router-link></li>
      <li class = "link" display="block"><router-link to="/register">Register</router-link></li>
      <li class = "link" display="block"><router-link to="/login">Login</router-link></li>
  </div>
</template>

<script>
export default {
  name: "Header"
}
</script>

<style scoped>
.nav{
  background-color:#333;
  overflow:hidden
}
.nav a{
  float: left;
  color:#f2f2f2;
  padding: 14px 16px;
  text-align: center;
  font-size:17px;
  text-decoration: none;
  margin-right: 5px;
}
</style>
