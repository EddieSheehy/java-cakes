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
      <label for="emailTextArea" class="form-label">Email</label>
      <input
        class="form-control"
        v-model="email"
        id="Email"
        placeholder="Email"
      />
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
    <div class="mb-3">
      <label for="imageTextarea" class="form-label">Image</label>
      <input
        class="form-control"
        v-model="image"
        id="image"
        placeholder="Image"
      />
    </div>
  <div id="uploadfile">
    <form id="upload-form">
      <input type="file" name="file" required/>
      
      <input type="submit" value="Upload"/>
      </form>
      </div>
      

    <div class="mb-3 right">
      <button type="button" @click="postComment" class="btn btn-primary">
        Upload
      </button>
    </div>

  </div>
</template>

<script>

import Blog2 from "./Blog2";
import app from "../api/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getStorage, ref as stRef,uploadBytes,getDownloadURL} from "firebase/storage";
import {getDatabase, ref as dbRef, push, set} from "firebase/database";
import {
  getFunctions,
  httpsCallable,
  connectFunctionsEmulator,
} from "firebase/functions";
import { store } from "../store/store";

const storage = getStorage(app);
const database = getDatabase();
const databaseReference = dbRef(database, "files");

window.addEventListener("load", function () {
  document.getElementById("upload-form").addEventListener("submit", function (){
    event.preventDefault();
    var form = event.target;

    var file = form.file.files[0];
    
    const storageRef = stRef(storage, new Date()+ "-" +file.name);

    uploadBytes(storageRef, file).then(function (snapshot){
      var newFileRef = push(databaseReference);
      console.log(databaseReference);


      set(newFileRef, {
        "name":file.name,

      
    
      });
    });
  });
});

export default {
  name: "Blog",
  data() {
    return {
      comment: "",
      price: "",
      beds: "",
      image:"",
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
      postComment({ email: this.email, comment: this.comment, beds: this.beds, price: this.price,image:this.image, uid: uid }).then(
        (result) => {
          // Read result of the Cloud Function.
          // /** @type {any} */
          this.$router.push("/secure");
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
