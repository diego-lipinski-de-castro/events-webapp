<template>
    <div>

        <div class="columns">

            <div class="column is-one-third">
                <h1 class="title">Dados da conta</h1>

                <div class="field">
                    <label class="label">Display Name</label>
                    <div class="control">
                        <input v-model="user.displayName" class="input" type="text">
                    </div>
                </div>

                <div class="field">
                    <label class="label">Email</label>
                    <div class="control">
                        <input v-model="user.email" class="input" type="text">
                    </div>
                </div>

                <div class="control">
                    <button @click="deleteUser" class="button is-danger">Delete account</button>
                    <button @click="logout" class="m-l-5 button is-warning">Logout</button>
                </div>

            </div>

        </div>

    </div>
</template>

<script>

    import { mapMutations, mapGetters } from 'vuex'

    export default {
        name: 'profile',
        data: () => ({
        }),
        computed: {
            ...mapGetters('user', [
                'user'
            ])
        },
        methods: {
            ...mapMutations('app', [
                'SET_LOADING'
            ]),
            ...mapMutations('user', [
                'SET_USER'
            ]),
            logout() {
                this.SET_USER(null)
                this.$router.push('auth')
            },
            deleteUser() {
                this.SET_LOADING(true)
                this.$axios.delete(`/users/${this.user.id}`)
                .then(() => {
                    this.SET_USER(null)
                    this.SET_LOADING(false)
                    this.$router.push('auth')
                })
                .catch(error => {
                    console.error(error)
                    this.SET_LOADING(false)
                })
            }
        }
    }

</script>
