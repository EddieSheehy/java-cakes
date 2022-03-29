<template>
  <!--Page header that is visible on all pages-->

  <div class="nav">
      <li class = "link" display="block"><router-link to="/"><img alt="Java Cake logo" src="../assets/logo.png"></router-link></li>
      <li class = "link" display="block"><router-link  v-if="!isLoggedIn" to="/register">Register</router-link></li>
      <li class = "link" display="block"><router-link v-if="!isLoggedIn" to="/login">Login</router-link></li>
      <li class = "link" display="block"><router-link v-if="isLoggedIn" to="/secure">Profile</router-link></li>
      <!--<li class = "link" display="block"><router-link to="/blog">Blog</router-link></li>-->
      <!--<li class = "link" id="logOut" display="block"><router-link to="/blog">Log out</router-link></li>-->
  </div>
</template>

<script>
import app from "../api/firebase";
import { getAuth, signOut } from "firebase/auth";
const auth = getAuth(app);
export default {
  name: "Header",
  data(){
    return {
      isLoggedIn : false
    }
  },
  created() {
    // Check if the user is logged in
    auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in continue to the page
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
  },
  methods: {
    logout() {
      signOut(getAuth(app)).then(() => {
        // Send them back to the home page!
        this.$router.push("/");
      });
    }
  }
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
