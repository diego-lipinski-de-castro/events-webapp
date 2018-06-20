<template>
    <div class="container m-t-50">

        <div class="columns">

            <div class="column is-one-third">
                <h1 class="title">Novo evento</h1>

                <div class="field">
                    <label class="label">Name</label>
                    <div class="control">
                        <input v-model="event.name" class="input" type="text" placeholder="name">
                    </div>
                </div>

                <div class="field">
                    <label class="label">Start date</label>
                    <div class="control">
                        <input v-model="event.start_date" class="input" type="text" placeholder="date">
                    </div>
                </div>

                <div class="field">
                    <label class="label">End date</label>
                    <div class="control">
                        <input v-model="event.end_date" class="input" type="text" placeholder="date">
                    </div>
                </div>

                <div class="field">
                    <label class="label">Location</label>
                    <div class="control">
                        <input v-model="event.location" class="input" type="text" placeholder="location">
                    </div>
                </div>

                <div class="field">
                    <label class="label">Photo</label>
                    <div class="control">
                        <input v-model="event.photoUrl" class="input" type="text" placeholder="photo">
                    </div>
                </div>

                <div class="field">
                    <label class="label">Description</label>
                    <div class="control">
                        <textarea v-model="event.description" class="textarea" placeholder="description">
                        </textarea>
                    </div>
                </div>

                <div class="control">
                    <button @click="saveEvent" class="button is-primary">Submit</button>
                </div>
            </div>

            <div class="is-divider-vertical"></div>

            <div class="column is-two-thirds">

                <div class="columns" v-for="(row, rowIndex) in chunkedEvents" :key="`row-${rowIndex}`">

                    <div class="column is-half" v-for="(event, eventIndex) in row" :key="`event-${eventIndex}`">
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
        </div>

    </div>
</template>

<script>

    import { mapMutations, mapGetters } from 'vuex'

    export default {
        name: 'home',
        data: () => ({
            event: {
                name: 'First event!',
                start_date: '18/08/18 18:00',
                end_date: '19/08/18 10:00',
                location: 'location',
                photoUrl: 'http://via.placeholder.com/350x150',
                description: 'description',
                created_by: this.user
            },
            events: []
        }),
        computed: {
            ...mapGetters('user', [
                'user'
            ])
            chunkedEvents() {
                return this.$lodash.chunk(this.events, 2)
            }
        },
        methods: {
            ...mapMutations('app', [
                'SET_LOADING'
            ]),
            getEvents() {
                this.SET_LOADING(true)
                this.$axios.get('/events')
                    .then(res => this.events = res.data._embedded.events)
                    .catch(error => console.error(error))
                    .then(() => this.SET_LOADING(false))
            },
            saveEvent() {
                this.SET_LOADING(true)
                this.$axios.post('/events', this.event)
                .catch(error => console.error(error))
                .then(() => {
                    this.SET_LOADING(false)
                    this.getEvents()
                })
            }
        },
        mounted() {
            this.getEvents()
        }
    }

</script>
