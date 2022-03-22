<template>
    <div>
    <h1>Welcome to my About Us Page</h1>
        <p>
            <img alt="Engineering Building" src="../assets/EngBuilding.jpg">
        </p>
    </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFunctions, httpsCallable, connectFunctionsEmulator } from "firebase/functions";
export default {
    name: "AboutUs"
}
</script>

<style scoped>

</style>