<template>
  <div id="app">
    <v-app>
      <v-app-bar app color="secondary" dark>
        <v-tabs align-with-title>
          <v-tab to="/">Home</v-tab>
          <v-tab to="/products">Products</v-tab>
          <v-tab to="/admin">Admin</v-tab>
          <v-tab to="/about">About</v-tab>
        </v-tabs>
        <v-spacer></v-spacer>
        <v-btn to="/login" v-show="!$store.state.user.user" text>Login</v-btn>
        <v-btn to="/logout" v-show="!!$store.state.user.user" text>Logout</v-btn>
      </v-app-bar>
      <v-content>
        <v-container fluid>
          <v-row>
            <v-col cols="1"></v-col>
            <v-col cols="10">
              <router-view />
            </v-col>
            <v-col cols="1"></v-col>
          </v-row>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>
