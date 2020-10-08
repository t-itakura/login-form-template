<template>
<div>
    token:, {{user.token}}
    <br>
    email:, {{user.email}}
      <v-row>
          token: {{user.token}}
      </v-row>
      <v-row>
          email: {{user.email}}
      </v-row>
      <v-row>
        <v-col>
            <v-btn block color="primary" @click="logout">Logout</v-btn>
        </v-col>
      </v-row>

</div>
</template>

<script>
export default {
    computed: {
        user() {
            return this.$store.getters.user;
        }
    },
    methods: {
        logout() {
            this.$store.dispatch('logout')
            this.$router.push('/');
        }
        
    }
}
</script>