<script>
import axios from 'axios';
import ProjectsList from '../projects/ProjectsList.vue';
import { store } from '../../data/store';
const baseUri = 'http://localhost:8000/api';

export default {
    name: "TypeProjectsPages",
    components: {
        ProjectsList,
    },
    data: () => ({
        projects: [],
        typeLabel: '',
        store,
    }),

    methods: {
        async fetchProjects() {
            store.isLoading = true;

            try {
                const res = await axios.get(`${baseUri}/types/${this.$route.params.slug}/projects/`);
                const { label, projects } = res.data;
                this.projects = projects;
                this.typeLabel = label;
            } catch (err) {
                console.error(err);
                this.$router.push({ name: 'not-found' });
            }
            store.isLoading = false;
        }
    },
    created() {
        this.fetchProjects()
    }
};
</script>

<template>
    <h1>{{ typeLabel }} Projects</h1>
    <ProjectsList :projects="projects" />
</template>

<style lang="scss" scoped>
/* Style here */
</style>