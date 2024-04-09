<script>
import axios from 'axios';
const endpoint = 'http://localhost:8000/api/contact-message';
import { store } from '../../data/store';
import FormAlert from '../forms/FormAlert.vue';

const defaultForm = {
    email: '',
    subject: '',
    content: '',
}
export default {
    name: "ContactUsPage",
    components: {
        FormAlert,
    },
    data: () => ({
        form: defaultForm,
        successMessage: null,
        errors: {},
        isPristine: true,
    }),
    computed: {

        hasErrors() {
            //? Object.keys(this.errors).length Restituisce un array con le chiavi di quello che mettiamo tra parentesi

            return Object.keys(this.errors).length;
        },

        showAlert() {
            // Controllo se abbiamo un messaggio di successo o se l'oggetto errors ha delle chiavi, la risposta la trasformo in booleano usando Boolean()
            return Boolean(this.successMessage || this.hasErrors);
        },

        alertType() {
            return this.hasErrors ? 'danger' : 'success';
        }
    },
    methods: {
        validateField(field) {
            // Se il form è stato toccato
            if (this.isPristine) return '';

            // Altrimenti prendi gli errori vedi se c'è una chiave come il field restituisci is-invalid altrimenti is-valid
            return this.errors[field] ? 'is-invalid' : 'is-valid';
        },

        // Validazione Front
        validateForm() {
            // Svuoto
            this.errors = {};
            this.successMessage = null;

            // Validazione email
            if (!this.form.email) {
                this.errors.email = 'The mail is required';
            } else if (!this.form.email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {

                this.errors.email = 'Mail is not valid';
            }

            // Validazione subject
            if (!this.form.subject) this.errors.subject = 'Subject field is required';

            // Validazione content
            if (!this.form.content) this.errors.content = 'Mail content is required';
        },

        async sendForm() {
            // Imposto che è stato toccato il form quindi non è più "intoccato"
            this.isPristine = false;

            // Valido
            this.validateForm();

            // Se c'è un errore esci
            if (this.hasErrors) return

            store.isLoading = true;
            try {
                await axios.post(endpoint, this.form);
                this.isPristine = true;
                this.form = { ...defaultForm };
                this.successMessage = 'Your message has been sent successfully';
            } catch (err) {
                console.error(err);
                // Se lo status dell'errore è 422
                if (err.response.status === 422) {
                    // Tira fuori l'oggetto errors da err.response.data che sono gli errori gestiti dal back
                    const { errors } = err.response.data;

                    // Prendo i miei errori e lo riassegno con gli errori appena presi sotto spread
                    this.errors = { ...errors };
                } else {
                    // Altrimenti hardcoda l'errore a 'An error occurred' (errore generico)
                    this.errors = { network: 'An error occurred' };
                }

            }
            store.isLoading = false;
        }

        //? Metodo vecchio
        /*sendForm() {
            this.isPristine = false;
            this.validateForm;
            if(this.hasErrors) return
            
            store.isLoading = true;
            axios.post(endpoint, this.form)
                .then(() => { 
                    this.isPristine = true;
                    this.form = { ...defaultForm};
                    this.successMessage = 'Your message has been sent successfully';
                })
                .catch((err) => {
                    console.error(err)
                    if(err.response.status === 422) {
                        const {errors} = err.response.data;
                        this.errors = {...errors};
                    }else{
                        this.errors = { network: 'An error occurred' };
                    }
                 })
                .then(() => { 
                    store.isLoading = true;
                });
        }*/
    }
};
</script>

<template>
    <h1 class="my-5">Contct Us</h1>

    <!-- Form Alert -->
    <FormAlert :isOpen="showAlert" :type="alertType" :dismissible="!hasErrors">
        <div v-if="successMessage">{{ successMessage }}</div>
        <ul v-if="hasErrors">
            <li v-for="(error, key) in errors" :key="key">{{ error }}</li>
        </ul>
    </FormAlert>

    <!-- Contact Form -->
    <form @submit.prevent="sendForm">

        <!-- Email -->
        <div class="mb-3">
            <label for="email" class="form-label">Email address <sup class="text-danger">*</sup></label>
            <input type="email" class="form-control" :class="validateField('email')" id="email"
                placeholder="name@example.com" v-model.trim="form.email" required>
            <div v-if="errors.email" class="invalid-feedback">{{ errors.email }}</div>
            <small v-else class="form-text text-muted">Your email, we will contact you at this address</small>
        </div>

        <!-- Subject -->
        <div class="mb-3">
            <label for="subject" class="form-label">Subject<sup class="text-danger">*</sup></label>
            <input type="text" class="form-control" :class="validateField('subject')" id="subject"
                v-model.trim="form.subject" required>
            <div v-if="errors.subject" class="invalid-feedback">{{ errors.email }}</div>
        </div>

        <!-- Content -->
        <div class="mb-3">
            <label for="content" class="form-label">Content<sup class="text-danger">*</sup></label>
            <textarea class="form-control" :class="validateField('content')" id="content" rows="5"
                v-model.trim="form.content"></textarea>
            <div v-if="errors.content" class="invalid-feedback">{{ errors.content }}</div>
        </div>

        <!-- Submit Button -->
        <div class="d-flex justify-content-end">
            <button type="submit" class="btn btn-primary">Send</button>
        </div>
    </form>
</template>

<style lang="scss" scoped>
/* Style here */
</style>