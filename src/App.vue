<template>
  <v-app>
    <v-snackbar
        :model-value="!!errorMessage"
        multi-line
        :timeout="4000"
        color="error"
        variant="tonal"
        location="top"
    >
      {{ errorMessage }}

      <template v-slot:actions>
        <v-btn
            icon="mdi-close"
            variant="text"
            @click="rmMessage"
        />
      </template>
    </v-snackbar>
    <div class="d-flex justify-end mx-12">
      <v-btn
        text="Выход"
        @click="$mainStore.logout"
      />
    </div>
    <RouterView/>
  </v-app>
</template>

<script setup lang="ts">
import { initSocket } from './socket.ts'
import {ref} from "vue";
import {useMainStore} from "@/stores/mainState.ts";
import {errorMessage, rmMessage} from "@/helpers/helpers.ts";

const $mainStore = useMainStore()


initSocket()
</script>
<style scoped>

</style>
