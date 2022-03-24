<template>
  <div class="nav">
      <li class = "link" display="block"><router-link to="/"><img alt="Vue logo" src="../assets/logo.png"></router-link></li>
      <li class = "link" display="block"><router-link to="/register">Register</router-link></li>
      <li class = "link" display="block"><router-link to="/login">Login</router-link></li>
      <li class = "link" display="block"><router-link to="/secure">Secure</router-link></li>
      <li class = "link" display="block"><router-link to="/blog">Blog</router-link></li>
<<<<<<< Updated upstream
=======
      <li class = "link" id="logOut" display="block"><router-link to="/blog">Log out</router-link></li>
      
>>>>>>> Stashed changes
  </div>
</template>

<script>
import app from "../api/firebase"
    import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
    import { getFunctions, httpsCallable, connectFunctionsEmulator } from "firebase/functions";
    const auth = getAuth(app);
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
<<<<<<< Updated upstream
=======
.nav #logOut{
  right: 900px;
}
>>>>>>> Stashed changes
</style>
