<template>
  <h1>Login</h1>
  <br>
    <div class="container">
        <div class="form-group">
            <label for="exampleInputEmail1">Email Address</label>
            <input type="email" v-model="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Email">
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
          <br>
        <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" v-model="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
        </div>
      <br>
        <button @click="login" class="btn btn-primary">Login</button>
    </div>
</template>
<script>
    import app from "../api/firebase"
    import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
    import { getFunctions, httpsCallable, connectFunctionsEmulator } from "firebase/functions";

    export default {
        name: "Login",
        data(){
            return {
                email: "",
                password:""
            }
        },
        methods : {
            login(){
            const auth = getAuth(app);
            signInWithEmailAndPassword(auth, this.email, this.password).then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                console.log(user);
                this.$router.push("/");
            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode)
                console.log(errorMessage)
            });
        }
    }
}
</script>
    <style scoped>
        h1{
            line-height:100px;
        }

        input{
            width:25%;
            margin-left: auto;
            margin-right: auto;
        }
    </style>