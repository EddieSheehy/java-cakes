<template>
    <div>
        Counter {{store.count}}
        <button type="button" @click="store.increment()" class="btn btn-primary">Click Counter</button>
    </div>
</template>

<script>
import {store} from '../store/store';

export default {
    name: "Blog2",
    data(){
    return {
        store
    }
  }
}
</script>

<style scoped>

</style>