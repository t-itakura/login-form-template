<template>
<v-app>
<v-container>
  <v-card width="400px" class="mx-auto mt-5" >
    <v-card-text>
      <div class="layout column align-center">
        <h1 class="flex my-4 ">Login</h1>
      </div>
      <v-form ref="loginForm">
        <v-text-field
          name="login"
          label="email"
          type="text"
          v-model="email"
          :counter="128"
          :rules="emailRules"
          required
          prepend-icon="mdi-email" 
        ></v-text-field>
        <v-text-field
          name="password"
          label="password"
          id="password"
          type="password"
          v-model="password"
          :counter="32"
          :rules="passwordRules"
          required
          prepend-icon="mdi-lock"
          
        ></v-text-field>
    <v-card-actions>
      <v-row>
        <v-col>
      <v-btn block color="primary" @click="login">Login</v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
    </v-form>
    </v-card-text>
  </v-card>
  <div>こんにちは、{{ email }} さん！</div>
  <div>こんにちは、{{ user.email }} さん！</div>
  <div>こんにちは、{{ user.token }} さん！</div>
</v-container>
</v-app>
</template>

<script>
import auth from './auth'

export default {
  data: () => ({
    loading: false,
    emailRules: [
      v => !!v || "メールアドレスは必須項目です。",
      v => (v && v.length <= 128) || "メールアドレスは128文字以内で入力してください。",
      v => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || "メールアドレスの形式が正しくありません。"
    ],
    passwordRules: [
      v => !!v || "パスワードは必須項目です。",
      v => (v && v.length <= 32) || "パスワードは32文字以内で入力してください。"
    ],
    email: '',
    password: ''
  }),
  methods: {
    login() {
        auth.login(this.email, this.password)
    }
  },
  computed: {
      user() {
          return this.$store.getters.user;
      }
  }
}
</script>