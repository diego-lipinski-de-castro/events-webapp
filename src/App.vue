<template>
    <div id="app">
        <loading-overlay :loading.sync="loading"></loading-overlay>

        <nav class="navbar is-fixed-top is-info" role="navigation">

            <div class="navbar-brand">
                <router-link class="navbar-item" to="home"> Pirulito </router-link>
            </div>

            <div class="navbar-menu">
                <!-- <div class="navbar-start"></div> -->

                <div class="navbar-end">

                    <template v-if="!user">
                        <router-link class="navbar-item" to="auth">
                            Login / Register
                            <i class="m-l-10 fa fa-sign-in" aria-hidden="true"></i>
                        </router-link>
                    </template>

                    <template v-else>
                        <router-link class="navbar-item" to="profile">
                            Profile
                            <i class="m-l-10 fa fa-user-circle" aria-hidden="true"></i>
                        </router-link>

                        <router-link class="navbar-item" to="events">
                            My Events
                            <i class="m-l-10 fa fa-calendar" aria-hidden="true"></i>
                        </router-link>

                        <a href="javascript:void(0);" @click="logout" class="navbar-item">
                            Logout
                            <i class="m-l-10 fa fa-sign-out" aria-hidden="true"></i>
                        </a>
                    </template>

                </div>
            </div>

        </nav>

        <div class="container m-t-50 m-b-50">
            <transition name="fade" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>

        <!-- <footer class="footer">
            <div class="content has-text-centered">
            <p>
                Pirulito © {{year}}
            </p>
            </div>
        </footer> -->

    </div>
</template>

<script>

    import { mapMutations, mapGetters } from 'vuex'

    export default {
        name: 'app',
        data() {
            return {
                year: new Date().getFullYear()
            }
        },
        computed: {
            ...mapGetters('app', [
                'loading'
            ]),
            ...mapGetters('user', [
                'user'
            ])
        },
        methods: {
            ...mapMutations('user', [
                'SET_USER'
            ]),
            logout() {
                this.SET_USER(null)
                this.$router.push('auth')
            }
        }
    }

</script>

<style lang="sass">
    @import './assets/sass/app.sass'
</style>
