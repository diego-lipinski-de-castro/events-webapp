<template>
    <div id="app">
        <loading-overlay :loading.sync="loading"></loading-overlay>
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>

    import { mapGetters } from 'vuex'

    export default {
        name: 'app',
        computed: {
            ...mapGetters('app', [
                'loading'
            ])
        }
    }

</script>

<style lang="sass">
    @import '~bulma/bulma.sass'
    @import '~bulma-divider'
    @import './assets/sass/app.sass'
</style>
