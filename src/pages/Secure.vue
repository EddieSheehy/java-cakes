<template>
    <h1>Welcome to the secure page</h1>
    <button type = "button" @click = "getUserComments" class="btn btn-primary">Get Comments</button>
    <br>
    <div class="mb-3">
    <ul id="array-rendering">
        <li v-for="comment in comments">
        <div v-if="!editing">
            <span class='text' @click="enableEditing(comment.comment)">{{comment.comment}}</span>
        </div>
        <div v-if="editing">
            <input v-model="tempValue" class="input"/>
            <button @click="disableEditing"> Cancel </button>
            <button @click="save(comment.id)"> Save </button>
        </div>
        
        </li>
    </ul>
</div>
   
</template>
<script>
    import app from "../api/firebase"
    import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
    import { getFunctions, httpsCallable, connectFunctionsEmulator } from "firebase/functions";
    const auth = getAuth(app);

    export default {
        beforeRouteEnter(to, from, next) {
            auth.onAuthStateChanged(function(user) {
                if (user) {
                    // User is signed in continue to the page
                    next();
                } else
                {
                    // No user is signed in.
                    next({path: '/'})
                    console.log("No user signed in")
                    // Send them back to the login page
                }
            });
        },

        name: "Secure",
        data(){
            return {
                comments: []
            }
        },

        methods : {
            getUserComments(){
                const functions = getFunctions(app);
                if(window.location.hostname === "localhost") // Check if working locally
                    connectFunctionsEmulator(functions, "localhost", 5001);
                const getComments = httpsCallable(functions, 'getcomments');
                let loader = this.$loading.show({
                    // Optional parameters
                    loader: 'dots',
                    container: this.$refs.container,
                    canCancel: false
                });
                getComments().then((result) => {
                    // Read result of the Cloud Function.
                    // /** @type {any} */
                    // once the response has returned hide the loader
                    loader.hide();
                    console.log(result);
                    if(result.data === 'No data in database')
                        this.comments = [{comment : "No comments posted yet for this user"}]
                    else
                        this.comments = result.data;
                });
            }
        }
    }
</script>
    <style scoped>
</style>