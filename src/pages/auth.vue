<template>
    <div>

        <div class="columns flex-center-h">

            <div class="column is-4">

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

            </div>

            <div class="is-divider-vertical" data-content="OR"></div>

            <div class="column is-4">

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

        </div>

    </div>
</template>

<script>

    import { mapMutations } from 'vuex'

    export default {
        name: 'auth',
        data: () => ({
            authUser: {
                email: 'demo@email.com',
                password: '123456'
            },
            newUser: {
                displayName: '',
                email: '',
                password: ''
            }
        }),
        methods: {
            ...mapMutations('app', [
                'SET_LOADING'
            ]),
            ...mapMutations('user', [
                'SET_USER'
            ]),
            createUser() {
                // this.SET_LOADING(true)
                // this.$axios.post('/users', this.newUser)
                // .then(res => {
                //     this.SET_USER(res.data)
                //     this.SET_LOADING(false)
                //     this.$router.push('profile')
                // })
                // .catch(error => console.error(error))
                setTimeout(() => {
                    this.SET_USER({
                        displayName: this.newUser.displayName,
                        email: this.newUser.email,
                        password: this.newUser.password,
                    })
                    this.SET_LOADING(false)
                    this.$router.push('profile')
                }, 1000)
            },
            login() {
                setTimeout(() => {
                    this.SET_USER({
                        email: this.authUser.email,
                        password: this.authUser.password
                    })
                    this.SET_LOADING(false)
                    this.$router.push('profile')
                }, 1000)

                // this.SET_LOADING(true)
                // this.$axios.post('/users/login', this.$qs.stringify(this.authUser))
                // .then(res => {
                //     this.SET_USER(res.data)
                //     this.SET_LOADING(false)
                //     this.$router.push('profile')
                // })
                // .catch(error => {
                //     console.error(error)
                //     this.SET_LOADING(false)
                // })
            }
        }
    }

</script>
