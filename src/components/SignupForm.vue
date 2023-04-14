<script lang="ts" setup>
import { computed, ref } from 'vue'
import FormInput from './FormInput.vue';
import { validate, length, required } from '../validation'
import { NewUser } from '../users';
import { useUsers } from '../stores/users';
import { useModal } from '../composables/modal';

const username = ref('');
const modal = useModal();

const usernameStatus = computed(() => {
  return validate(username.value, [required, length({min: 5, max: 10})])
})

const password = ref('');

const passwordStatus = computed(() => {
  return validate(password.value, [required, length({min: 10, max: 40})])
})

const isInvalid = computed(() => {
    return (!usernameStatus.value.valid || !passwordStatus.value.valid)
})

const usersStore = useUsers();

async function handleSubmit(event: Event) {
    const newUser: NewUser = {
        username: username.value,
        password: password.value,
    }
    console.log(newUser);
    try{
        await usersStore.createUser(newUser);
    } catch (e) {

    }
    modal.hideModal()
}

</script>

<template>
    <form class="form" @submit.prevent="handleSubmit">
    <FormInput type="text" name="Username" v-model="username" :status="usernameStatus"/>
    <FormInput type="password" name="Password" v-model="password" :status="passwordStatus"/>
   
    <button class="button" style="margin-top: 30px;" :disabled="isInvalid">Login</button>
    
    </form>
</template>

<style>
.form {
    background: white;
    margin-top: 30px;
    padding: 50px;
}
.button{
    color: aqua;
}
</style>