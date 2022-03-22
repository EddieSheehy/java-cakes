<template>
  <h1>This is where the links should be</h1>
  <router-link to="/">Go to Home</router-link>
  <br>
  <router-link to="/blog">Go to Blog</router-link>
  <br>
  <router-link to="/aboutus">About Us</router-link>
  <br>
  <router-link to="/register">Register</router-link>
  <br>
  <router-link to="/login">Login</router-link>
  <br>
  <router-link to ="/secure">Secure</router-link>
  <br>
  <a href="#" style="cursor:pointer" @click="logout">Logout</a>
</template>

<script>
import app from "../api/firebase"
import {getAuth, signOut} from "firebase/auth";
import { getFunctions, httpsCallable, connectFunctionsEmulator } from "firebase/functions";


export default {
  name: 'Footer',
  props: {
    msg: String
  },
  methods : {
    logout()
    {
      signOut(getAuth(app)).then(() => {
        //Send them back to the home page!
        this.$router.push("/");
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  list-style-type: none;
  padding: 0;
  background-color: grey;
}
li {
  display: inline-block;
  margin: 0 10px;
}
</style>
