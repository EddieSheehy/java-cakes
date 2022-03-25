<template>
  <div ref="container" class="container">
    <h1>Listing Creation</h1>
    <p>Here you can create listing for propeties</p>
    <div class="mb-3">
      <label for="addressTextArea" class="form-label">Address</label>
      <textarea
        class="form-control"
        v-model="comment"
        id="address"
        placeholder="Address"
        rows="3"
      ></textarea>
    </div>
    <div class="mb-3">
      <label for="priceTextarea" class="form-label">Price (€) per month</label>
      <input
        class="form-control"
        v-model="price"
        id="Price"
        placeholder="Price"
      />
    </div>
    <div class="mb-3">
      <label for="exampleFormControlTextarea" class="form-label">Beds</label>
      <input
        class="form-control"
        v-model="beds"
        id="beds"
        placeholder="No. Beds"
      />
    </div>
    <div class="mb-3 right">
      <button type="button" @click="postComment" class="btn btn-primary">
        Upload
      </button>
    </div>
    <!--<div class="mb-3 right">
      <button type="button" @click="getComments" class="btn btn-primary">
        Show Comments
      </button>
    </div>
    <div class="mb-3">
      <ul id="array-rendering">
        <li v-for="comment in comments">
          <div v-if="!editing">
            <span class="text" @click="enableEditing(comment.comment)">{{
              comment.comment
            }}</span>
          </div>
          <div v-if="editing">
            <input v-model="tempValue" class="input" />
            <button @click="disableEditing">Cancel</button>
            <button @click="save(comment.id)">Save</button>
          </div>
          <button
            type="button"
            @click="deleteComment(comment.id)"
            class="btn btn-primary"
          >
            Delete Comment
          </button>
        </li>
      </ul>
    </div>-->
    <!--<div>
        Counter {{store.count}}
        <button type="button" @click="store.increment()" class="btn btn-primary">Click Counter {{store.count}}</button>
    </div>-->

    <!--<div>
      <Blog2 />
    </div>-->
  </div>
</template>

<script>
import Blog2 from "./Blog2";
import app from "../api/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {
  getFunctions,
  httpsCallable,
  connectFunctionsEmulator,
} from "firebase/functions";
import { store } from "../store/store";

export default {
  name: "Blog",
  data() {
    return {
      comment: "",
      price: "",
      beds: "",
      comments: [],
      tempValue: "",
      editing: false,
      store,
    };
  },
  components: {
    Blog2,
  },
  created() {
    this.getComments();
  },
  methods: {
    enableEditing(comment) {
      this.tempValue = comment;
      this.editing = true;
    },
    disableEditing() {
      this.tempValue = null;
      this.editing = false;
    },
    save(id) {
      const functions = getFunctions(app);
      if (window.location.hostname === "localhost")
        // Check if working locally
        connectFunctionsEmulator(functions, "localhost", 5001);
      const updateComment = httpsCallable(functions, "updatecomment?id=" + id);
      updateComment({ comment: this.tempValue }).then((result) => {
        this.getComments();
        this.editing = false;
      });
    },
    postComment() {
      const functions = getFunctions(app);
      const auth = getAuth(app);
      if (window.location.hostname === "localhost")
        // Check if working locally
        connectFunctionsEmulator(functions, "localhost", 5001);
      const postComment = httpsCallable(functions, "postcomment");
      let uid = "anonymous";
      if (auth.currentUser != null) {
        // Check that there is a logged in user
        uid = auth.currentUser.uid; // if logged in then assign uid
      }
      postComment({ comment: this.comment, beds: this.beds, price: this.price, uid: uid }).then(
        (result) => {
          // Read result of the Cloud Function.
          // /** @type {any} */
          console.log(result);
        }
      );
    },
    getComments() {
      const functions = getFunctions(app);
      if (window.location.hostname === "localhost")
        // Check if working locally
        connectFunctionsEmulator(functions, "localhost", 5001);
      const getComments = httpsCallable(functions, "getcomments");
      let loader = this.$loading.show({
        // Optional parameters
        loader: "dots",
        container: this.$refs.container,
        canCancel: false,
      });
      getComments().then((result) => {
        // Read result of the Cloud Function.
        // /** @type {any} */
        // once the response has returned hide the loader
        loader.hide();
        console.log(result);
        if (result.data === "No data in database")
          this.comments = [{ comment: "No comments posted yet" }];
        else this.comments = result.data;
      });
    },
    deleteComment(id) {
      console.log(id);
      const functions = getFunctions(app);
      if (window.location.hostname === "localhost")
        // Check if working locally
        connectFunctionsEmulator(functions, "localhost", 5001);
      const deleteComment = httpsCallable(functions, "deletecomment?id=" + id);
      deleteComment().then((result) => {
        if (result.data == "Deleted document from database") this.getComments(); // To refresh the client
      });
    },
  },
};
</script>

<style scoped>
.container {
  text-align: left;
}
.right {
  text-align: right;
}
</style>
