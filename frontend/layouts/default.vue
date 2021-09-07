<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" mobile-breakpoint="768" app>
      <v-img
        class="pa-4 pt-7"
        src="https://picsum.photos/500/300/?random"
        height="170"
        max-width="250"
        gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
      >
        <div class="text-center">
          <v-avatar size="80" class="mb-2">
            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
          </v-avatar>
          <div
            v-if="$auth.loggedIn"
            class="white--text text-subtitle-1 font-weight-bold"
          >
            {{ $auth.user.name }}
          </div>
          <div v-else class="white--text text-subtitle-1 font-weight-bold">
            ゲストユーザー
          </div>
        </div>
      </v-img>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6"> My Todo App</v-list-item-title>
          <v-list-item-subtitle> manage your Todos </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" :to="item.to" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <template v-if="$auth.loggedIn">
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title @click="$auth.logout()"
                >Logout</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </template>
        <template v-else>
          <v-list-item to="/account/login" link>
            <v-list-item-icon>
              <v-icon>mdi-login</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Login</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="primary"
      dark
      src="https://picsum.photos/1920/1080?random"
      prominent
      height="170"
    >
      <template #img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
        ></v-img>
      </template>
      <v-container class="header-container">
        <v-row>
          <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        </v-row>
        <v-row justify="end">
          <v-app-bar-title class="text-h4 mr-4"
            >Manage Yourself</v-app-bar-title
          >
        </v-row>
        <v-row justify="end">
          <live-date-time class="mr-4 text-subtitle-1" />
        </v-row>
      </v-container>
    </v-app-bar>

    <v-main>
      <Nuxt />
      <snack-bar />
    </v-main>
  </v-app>
</template>

<script>
import SnackBar from '../components/shared/SnackBar.vue'
import LiveDateTime from '../components/tool/LiveDateTime.vue'
export default {
  components: { LiveDateTime, SnackBar },
  data() {
    return {
      drawer: false,
      items: [
        {
          title: 'Your Todos',
          icon: 'mdi-format-list-checks',
          to: '/todos',
        },
        { title: 'Timer', icon: 'mdi-timer-sand', to: '/timer' },
        { title: 'About', icon: 'mdi-help-box', to: '/about' },
      ],
      right: null,
    }
  },
  computed: {},
}
</script>

<style lang="scss">
.header-container {
  max-width: none !important;
}
</style>
