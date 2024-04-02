<script>
import ProjectsList from '../projects/ProjectsList.vue';
import axios from 'axios';
import { store } from '../../data/store';
const endpoint = 'http://localhost:8000/api/projects/'

export default {
    name: "HomePage",
    components: {
        ProjectsList,
    },

    data: () => ({
        projects: [],
        store,
    }),

    methods: {
        fetchProjects() {
            store.isLoading = true;
            axios.get(endpoint).then(res => {
                this.projects = res.data;
            }).catch(err => {
                console.error(err);
            }).then(() => {
                store.isLoading = false;
            })
        }
    },

    created() {
        this.fetchProjects();
    }
};
</script>

<template>
    <h1>Boolfolio</h1>
    <div v-if="!store.isLoading">
        <ProjectsList :projects="projects" />
    </div>

</template>

<style lang="scss" scoped>
/* Style here */
</style>