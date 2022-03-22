<template>

</template>

<script>
  import app from "../api/firebase"
    import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
    import { getFunctions, httpsCallable, connectFunctionsEmulator } from "firebase/functions";
export default {
  name: "Login"
}
</script>

<style scoped>

</style>