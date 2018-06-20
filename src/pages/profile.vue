<template>
    <div class="container m-t-50">

        <div class="columns">

            <div class="column is-one-third">

                <h1 class="title">Entrar</h1>

                <div class="field">
                    <label class="label">Email</label>
                    <div class="control">
                        <input v-model="authUser.email" class="input" type="email" placeholder="email">
                    </div>
                </div>

                <div class="field">
                    <label class="label">Password</label>
                    <div class="control">
                        <input v-model="authUser.password" class="input" type="password" placeholder="password">
                    </div>
                </div>

                <div class="control">
                    <button @click="login" class="button is-primary">Submit</button>
                </div>

                <div class="is-divider" data-content="OR"></div>

                <h1 class="title">Registre-se</h1>

                <div class="field">
                    <label class="label">Display name</label>
                    <div class="control">
                        <input v-model="newUser.displayName" class="input" type="text" placeholder="display name">
                    </div>
                </div>

                <div class="field">
                    <label class="label">Email</label>
                    <div class="control">
                        <input v-model="newUser.email" class="input" type="email" placeholder="email">
                    </div>
                </div>

                <div class="field">
                    <label class="label">Password</label>
                    <div class="control">
                        <input v-model="newUser.password" class="input" type="password" placeholder="password">
                    </div>
                </div>

                <div class="control">
                    <button @click="createUser" class="button is-primary">Submit</button>
                </div>

            </div>

            <div class="is-divider-vertical"></div>

            <div class="column is-two-thirds" v-if="user">
                <h1 class="title">Dados da conta</h1>

                <div class="field">
                    <label class="label">Display Name</label>
                    <div class="control">
                        <input v-model="user.displayName" class="input" type="text" placeholder="name">
                    </div>
                </div>

                <div class="field">
                    <label class="label">Email</label>
                    <div class="control">
                        <input v-model="user.email" class="input" type="text" placeholder="date">
                    </div>
                </div>

                <div class="control">
                    <button @click="deleteUser" class="button is-danger">Delete account</button>
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
            authUser: {
                email: 'diegocastroh20@gmail.com',
                password: '123'
            },
            newUser: {
                displayName: '',
                email: '',
                password: ''
            }
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
            createUser() {
                this.SET_LOADING(true)
                this.$axios.post('/users', this.newUser)
                .then(res => { console.log(res.data); this.SET_USER(res.data)})
                .catch(error => console.error(error))
                .then(() => this.SET_LOADING(false))
            },
            login() {
                this.SET_LOADING(true)
                this.$axios.post('/users/login', this.$qs.stringify(this.authUser))
                .then(res => this.SET_USER(res.data))
                .catch(error => console.error(error))
                .then(() => this.SET_LOADING(false))
            },
            deleteUser() {
                this.SET_LOADING(true)
                this.$axios.delete(`/users/${this.user.id}`)
                .catch(error => console.error(error))
                .then(() => this.SET_LOADING(false))
            }
        }
    }

</script>
