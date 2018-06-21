<template>
    <div>

        <div class="columns" v-for="(row, rowIndex) in chunkedEvents" :key="`row-${rowIndex}`">

            <div class="column is-one-third" v-for="(event, eventIndex) in row" :key="`event-${eventIndex}`">
                <div class="card">
                    <div class="card-image">
                        <figure class="image is-4by3">
                        <img :src="event.photoUrl" height="250">
                        </figure>
                    </div>
                    <div class="card-content">
                        <div class="content">
                        <h3> {{event.name}} </h3>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </div>
</template>

<script>

    import { mapMutations } from 'vuex'

    export default {
        name: 'home',
        data: () => ({
            events: []
        }),
        computed: {
            chunkedEvents() {
                return this.$lodash.chunk(this.events, 3)
            }
        },
        methods: {
            ...mapMutations('app', [
                'SET_LOADING'
            ]),
            getEvents() {
                this.SET_LOADING(true)
                this.$axios.get('/events')
                    .then(res => {
                        console.log(res.data)
                        if(res.data.length) {
                            this.events = res.data
                        }
                    })
                    .catch(error => console.error(error))
                    .then(() => this.SET_LOADING(false))
            }
        },
        mounted() {
            this.getEvents()
        }
    }

</script>
