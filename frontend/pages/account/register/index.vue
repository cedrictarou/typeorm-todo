<template>
  <div>
    <v-card class="mx-auto mt-5" max-width="400">
      <v-card-title>
        <h1 class="display-1">ユーザー登録</h1>
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="register">
          <v-text-field
            v-model="user.username"
            prepend-icon="mdi-account-circle"
            label="ユーザ名"
          />
          <v-text-field
            v-model="user.email"
            prepend-icon="mdi-email"
            type="email"
            label="emailアドレス"
          />
          <v-text-field
            v-model="user.password"
            :type="showPassword ? 'text' : 'password'"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            label="パスワード"
            @click:append="showPassword = !showPassword"
          />
          <v-text-field
            v-model="user.confirmPassword"
            :type="showPassword ? 'text' : 'password'"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            label="パスワード確認"
            @click:append="showPassword = !showPassword"
          />
          <v-card-actions class="justify-center">
            <v-btn color="primary" type="submit">登録</v-btn>
          </v-card-actions>
        </v-form>
        <v-divider class="mt-3"></v-divider>
        <div class="text-center mt-3">
          <div class="mb-2">すでに登録はお済みですか？</div>
          <nuxt-link class="text-subtitle link-text" to="/account/login"
            >ログインページへ</nuxt-link
          >
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  auth: false,
  layout: 'account',
  data: () => ({
    showPassword: false,
    user: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  }),
  methods: {
    async register() {
      const newUser = {
        username: this.user.username,
        email: this.user.email,
        password: this.user.password,
        confirmPassword: this.user.comfirmPassword,
      }
      await this.$axios.$post(`/users`, newUser)

      const response = await this.$auth.loginWith('local', {
        data: this.user,
      })
      const message = response.data.message
      this.$store.dispatch('snackbar/showSnackbar', message)
      this.$router.push('/todos')
    },
  },
}
</script>
<style lang="scss" scoped>
.link-text {
  color: #eeeeee;
  text-decoration: none !important;
}
</style>
