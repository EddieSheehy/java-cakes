<template>
  <!--Page header that is visible on all pages-->

  <div class="nav">
      <li class = "link" display="block"><router-link to="/homepage"><img alt="Java Cake logo" src="../assets/logo.png"></router-link></li>
      <li class = "link" display="block"><router-link to="/register">Register</router-link></li>
      <li class = "link" display="block"><router-link to="/login">Login</router-link></li>
      <li class = "link" display="block"><router-link to="/secure">Profile</router-link></li>
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
  padding: 10px 10px;
  text-align: center;
  font-size:25px;
  text-decoration: none;
  margin-right: 5px;
  margin-top: 10px;
}
#logOut{
  
}
</style>
