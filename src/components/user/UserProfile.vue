<template>
  <div>
    <v-card>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <h2>Personal details</h2>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-text-field label="First name" required>
              <v-icon slot="prepend" color="secondary">mdi-account-outline</v-icon>
            </v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field label="Last name" required></v-text-field>
          </v-col>
        </v-row>
        <hr />
        <v-row>
          <v-col cols="12">
            <h2 class="mt-4">Car</h2>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-text-field label="Plate number" required>
              <v-icon slot="prepend" color="secondary">mdi-car</v-icon>
            </v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field label="Registration number" required></v-text-field>
          </v-col>
        </v-row>
        <hr />
        <v-row>
          <v-col cols="12">
            <h2 class="mt-4">Apartment</h2>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-text-field label="Type" required>
              <v-icon slot="prepend" color="secondary">mdi-home-outline</v-icon>
            </v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field label="Construction" required></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-text-field label="Heating type" required></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-text-field label="Flor" required></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-text-field label="Size" required></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-text-field label="Year when built" required></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-text-field label="Last repair" required></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary">Save</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class UserProfile extends Vue {
  private valid = false;
  private alert = false;
  private errorMsg = "";
}
</script>
