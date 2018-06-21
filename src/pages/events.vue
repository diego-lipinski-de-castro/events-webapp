<template>
    <div>

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

                <div class="control" v-if="!isUpdating">
                    <button @click="saveEvent" class="button is-primary">Submit</button>
                </div>

                <div class="control" v-else>
                    <button @click="updateEvent" class="button is-warning">Submit</button>
                    <button @click="cancelUpdate" class="m-l-10 button is-link">Cancel</button>
                </div>
            </div>

            <div class="is-divider-vertical"></div>

            <div class="column is-two-thirds">

                <div class="columns" v-for="(row, rowIndex) in chunkedEvents" :key="`row-${rowIndex}`">

                    <div class="column is-half" v-for="(event, eventIndex) in row" :key="`event-${eventIndex}`">

                        <div class="card">
                            <header class="card-header">
                                <p class="card-header-title"> {{event.name}} </p>

                                <a href="javascript:void(0);" @click="setEventForm(event)" class="card-header-icon">
                                    <span class="icon">
                                        <i class="fa fa-pencil" aria-hidden="true"></i>
                                    </span>
                                </a>

                                <a href="javascript:void(0);" @click="deleteEvent(event.id)" class="card-header-icon">
                                    <span class="icon">
                                        <i class="fa fa-trash-o" aria-hidden="true"></i>
                                    </span>
                                </a>

                            </header>
                            <div class="card-image">
                                <figure class="image is-4by3">
                                <img :src="event.photoUrl" height="250">
                                </figure>
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
        name: 'user-events',
        data: () => ({
            event: {
                id: null,
                name: 'First event!',
                start_date: '18/08/18 18:00',
                end_date: '19/08/18 10:00',
                location: 'location',
                photoUrl: 'http://via.placeholder.com/350x150',
                description: 'description'
            },
            events: [],
            isUpdating: false
        }),
        computed: {
            ...mapGetters('user', [
                'user'
            ]),
            chunkedEvents() {
                return this.$lodash.chunk(this.events, 2)
            },
            requestEvent() {
                return { ...this.event, created_by: {...this.user} }
            }
        },
        methods: {
            ...mapMutations('app', [
                'SET_LOADING'
            ]),
            getEvents() {
                this.SET_LOADING(true)
                this.$axios.get(`/users/${this.user.id}/events`)
                    .then(res => {
                        if(res.data.length) {
                            this.events = res.data
                        }
                    })
                    .catch(error => console.error(error))
                    .then(() => this.SET_LOADING(false))
            },
            saveEvent() {
                this.SET_LOADING(true)
                console.log(this.requestEvent)
                this.$axios.post('/events', this.requestEvent)
                .catch(error => console.error(error))
                .then(() => {
                    this.SET_LOADING(false)
                    this.getEvents()
                })
            },
            updateEvent() {
                this.SET_LOADING(true)
                console.log(this.requestEvent)
                this.$axios.put(`/events/${this.requestEvent.id}`, this.requestEvent)
                .catch(error => console.error(error))
                .then(() => {
                    this.SET_LOADING(false)
                    this.getEvents()
                })
            },
            setEventForm(event) {
                this.event = event
                this.isUpdating = true
            },
            cancelUpdate() {
                this.isUpdating = false
                this.getEvents()
            },
            deleteEvent(id) {
                this.SET_LOADING(true)
                this.$axios.delete(`/events/${id}`)
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
