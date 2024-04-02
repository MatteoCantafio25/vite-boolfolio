<script>
export default {
    name: "ProjectCard",
    props: {
        project: Object,
        isDetail: Boolean,
    },

    computed: {
        abstract() {
            const abstract = this.project.content.slice(0, 250);
            return abstract + '...';
        },

        pubblicationDate() {
            const date = new Date(this.project.created_at);

            let day = date.getDate();
            let month = date.getMonth() + 1;
            const year = date.getFullYear();
            const hours = date.getHours();
            const minutes = date.getMinutes();

            if (day < 10) day = '0' + day;
            if (month < 10) month = '0' + month;

            return `${day}/${month}/${year} alle ${hours}:${minutes}`;
        }
    }
};
</script>

<template>
    <div class="card my-3">
        <div class="card-header d-flex align-items-center justify-content-between">
            <h2>{{ project.title }}</h2>
            <RouterLink v-if="!isDetail" class="btn btn-sm btn-primary"
                :to="{ name: 'project-detail', params: { slug: project.slug } }">Open
            </RouterLink>
        </div>
        <div class="card-body clearfix">
            <img v-if="project.image" :src="project.image" :alt="project.title" class="img-fluid float-start me-3">
            <p>{{ isDetail ? project.content : abstract }}</p>
        </div>
        <div class="card-footer d-flex justify-content-between">
            <div>
                <address class="mb-2">By: Anonymous</address>
                <span class="badge" :style="{ backgroundColor: project.type?.color }">
                    {{ project.type ? project.type.label : 'Type None' }}
                </span>
            </div>

            <small>Pubblicato il {{ pubblicationDate }}</small>
        </div>
    </div>
</template>

<style lang="scss" scoped>
/* Style here */
</style>
