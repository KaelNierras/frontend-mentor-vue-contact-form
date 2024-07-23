<script setup>
import {reactive} from 'vue'

const state = reactive({
  firstNameError: '',
  lastNameError: '',
  emailError: '',
  selectedQueryError: '',
  messageError: '',
  agreementError: ''
})

const data = reactive({
  firstName: '',
  lastName: '',
  email: '',
  selectedQuery: '',
  message: '',
  agreement: false,
})

var validateFirstName = () => {
  if(data.firstName === ''){
    state.firstNameError = 'This field is required'
  }
  else{
    state.firstNameError = ''
  }
}

var validateLastName = () => {
  if(data.lastName === ''){
    state.lastNameError = 'This field is required'
  }
  else{
    state.lastNameError = ''
  }
}

var validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (data.email === '') {
    state.emailError = 'Email address is required';
  } else if (!emailRegex.test(data.email)) {
    state.emailError = 'Please enter a valid email address';
  } else {
    state.emailError = '';
  }
}

var validateQuery = () => {
  if(data.selectedQuery === ''){
    state.selectedQueryError = 'Please select a query type'
  }
  else{
    state.selectedQueryError = ''
  }
}

var validateMessage = () => {
  if(data.message === ''){
    state.messageError = 'This field is required'
  }
  else{
    state.messageError = ''
  }
}

var validateAgreement = () => {
  if(data.agreement ===  false){
    state.agreementError = 'To submit this form, please Consent to being contacted'
  }
  else{
    state.agreementError = ''
  }
}

var validateAll = () => {
  validateFirstName()
  validateLastName()
  validateEmail()
  validateQuery()
  validateMessage()
  validateAgreement()

  const hasError = Object.values(state).some(error => error !== '');
  if (hasError) {
    showNotificationError();
  } else {
    showNotification();
  }
}

// Notification Function

function showNotification() {
  const notification = document.querySelector('.notification');
  notification.style.display = 'block'; 
  setTimeout(() => {
    notification.classList.remove('hidden'); 
  }, 10); 

  setTimeout(() => {
    notification.classList.add('hidden');
  }, 5000);
}

function hideNotification() {
  const notification = document.querySelector('.notification');
  notification.classList.add('hidden'); 

  setTimeout(() => {
    notification.style.display = 'none';
  }, 500); 
}

// Notification Error Function

function showNotificationError() {
  const notification = document.querySelector('.notification-error');
  notification.style.display = 'block'; 
  setTimeout(() => {
    notification.classList.remove('hidden');
  }, 10); 

  setTimeout(() => {
    notification.classList.add('hidden');
  }, 5000); 
}

function hideNotificationError() {
  const notification = document.querySelector('.notification-error');
  notification.classList.add('hidden');

  setTimeout(() => {
    notification.style.display = 'none';
  }, 500); 
}
</script>

<template>
  <main class="flex items-center flex-col gap-3 desktop:justify-center mobile:justify-start h-svh">

    <!-- Success notification -->
    <div class="notification z-50 hidden bg-primary-600 p-6 text-neutral-white rounded-lg fixed top-10 desktop:right-10 mobile:right-50 mobile:mx-5">
      <div class="flex flex-row items-center gap-2">
        <img src="/images/icon-success-check.svg" alt="Logo" class="w-4 h-4" />
        <h1>Message Sent!</h1>
      </div>
      <p>Thanks for completing the form. We'll be in touch soon!</p>
      <!-- Close button -->
      <button @click="hideNotification" class="absolute top-0 right-2 mt-2 mr-2 text-neutral-white text-lg">
        &times;
      </button>
    </div>

    <!-- Error notification -->
        <div class="notification-error z-50 hidden bg-primary-red p-6 text-neutral-white rounded-lg fixed top-10 desktop:right-10 mobile:right-50 mobile:mx-5">
      <div class="flex flex-row items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 1 1-18 0a9 9 0 0 1 18 0"/></svg>
        <h1>Message Not Sent!</h1>
      </div>
      <p>Please comply the missing informations!</p>
      <!-- Close button -->
      <button @click="hideNotificationError" class="absolute top-0 right-2 mt-2 mr-2 text-neutral-white text-lg">
        &times;
      </button>
    </div>

    <div class="bg-white flex flex-col items-center drop-shadow-md desktop:p-8 mobile:p-5 rounded-lg desktop:m-0 mobile:m-6">
      <h2 class="self-start font-karla mb-8 font-bold text-2xl text-primary-600">Contact Us</h2>

      <form @submit.prevent="validateAll()" class="grid gap-4 w-full">

        <!-- first name and last name input fields -->
        <div class="grid mobile:grid-cols-1 desktop:grid-cols-2 gap-3">
          <div class="flex flex-col gap-3">
            <label for="firstName" class="text-neutral-600">First Name *</label>
            <input @blur="validateFirstName" :class="{'bg-neutral-white border-primary-red': state.firstNameError != ''}" class="border p-2 rounded-lg w-full px-5 focus:outline-none focus:ring-1 focus:ring-primary-600 hover:outline-none hover:ring-1 hover:ring-primary-600 hover:cursor-pointer" type="text" name="firstName" v-model="data.firstName" />
            <p v-if="state.firstNameError != ''" class="text-primary-red"> {{ state.firstNameError }} </p>
          </div>
          <div class="flex flex-col gap-3">
            <label for="lastName" class="text-neutral-600">Last Name *</label>
            <input @blur="validateLastName" :class="{'bg-neutral-white border-primary-red': state.lastNameError != ''}" class="border p-2 rounded-lg w-full px-5 focus:outline-none focus:ring-1 focus:ring-primary-600 hover:outline-none hover:ring-1 hover:ring-primary-600 hover:cursor-pointer" type="text" name="lastName" v-model="data.lastName"/>
            <p v-if="state.lastNameError != ''" class="text-primary-red"> {{ state.lastNameError }} </p>
          </div>
        </div>

        <!-- Email input field -->
        <div class="flex flex-col gap-3">
          <label for="email" class="text-neutral-600">Email *</label>
          <input @blur="validateEmail" :class="{'bg-neutral-white border-primary-red': state.emailError != ''}" class="border p-2 rounded-lg w-full px-5 focus:outline-none focus:ring-1 focus:ring-primary-600 hover:outline-none hover:ring-1 hover:ring-primary-600 hover:cursor-pointer" type="email" name="email" v-model="data.email"/>
          <p v-if="state.emailError != ''" class="text-primary-red"> {{ state.emailError }} </p>
        </div>

        <!-- Radio button options -->
        <div class="flex flex-col gap-3">
          <label class="text-neutral-600">Query Type *</label>
          <div class="grid mobile:grid-cols-1 desktop:grid-cols-2 gap-3">
            <label :class="{'bg-primary-200 border-primary-600': state.selectedQueryError === 'General', '': state.selectedQueryError !== 'General'}" class="border p-2 rounded-lg px-5 hover:bg-primary-200 hover:border-primary-600  active:bg-primary-200 active:border-primary-600 hover:cursor-pointer">
              <input class="accent-primary-600" @change="state.selectedQueryError = 'General'" type="radio" name="query" value="General Enquiry" v-model="data.selectedQuery"/>
              General Enquiry
            </label>
            <label :class="{'bg-primary-200 border-primary-600': state.selectedQueryError === 'Support', '': state.selectedQueryError !== 'Support'}" class="border p-2 rounded-lg px-5  hover:bg-primary-200 hover:border-primary-600 hover:cursor-pointer">
              <input class="accent-primary-600" @change="state.selectedQueryError = 'Support'" type="radio" name="query" value="Support Enquiry" v-model="data.selectedQuery" />
              Support Enquiry
            </label>
          </div>
          <p v-if="state.selectedQueryError == 'Please select a query type'" class="text-primary-red"> {{ state.selectedQueryError }} </p>
        </div>

        <!-- Email input field -->
        <div class="flex flex-col gap-3">
          <label for="email" class="text-neutral-600">Message *</label>
          <textarea @blur="validateMessage" :class="{'bg-neutral-white border-primary-red': state.messageError != ''}" class="mobile:h-64 desktop:h-24 border p-2 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-primary-600 hover:outline-none hover:ring-1 hover:ring-primary-600 hover:cursor-pointer"  name="message" v-model="data.message"></textarea>
          <p v-if="state.messageError != ''" class="text-primary-red"> {{ state.messageError }} </p>
        </div>

        <!-- Checkbox for terms and conditions -->
        <div class="mt-4 flex flex-row gap-3">
          <input class="accent-primary-600 hover:cursor-pointer" @change="validateAgreement" type="checkbox" name="agreement" v-model="data.agreement"/>
          <label for="agreement" class="text-neutral-600 hover:cursor-pointer">I consent to being contacted by the team *</label>
        </div>
        <p v-if="state.agreementError == 'To submit this form, please Consent to being contacted' " class="text-primary-red"> {{ state.agreementError }} </p>
        <button type="submit" class="bg-primary-600 text-neutral-white w-full p-2 rounded-lg mt-4 hover:bg-primary-550">Submit</button>
      </form>

    </div>
  </main>
</template>


<style>
/* Fade In Animation */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Fade Out Animation */
@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.hidden {
  animation: fadeOut 1s ease-out forwards;
}
</style>