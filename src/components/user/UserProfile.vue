<template>
  <div>
    {{$store.state.user.error}}
    <v-card v-if="$store.state.user.profile">
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <h2>Personal details</h2>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-text-field
              :readonly="!edit"
              v-model="$store.state.user.profile.firstname"
              label="First name"
              required
            >
              <v-icon slot="prepend" color="secondary">mdi-account-outline</v-icon>
            </v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              :readonly="!edit"
              v-model="$store.state.user.profile.surename"
              label="Surename"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <hr />
        <v-row>
          <v-col cols="12">
            <h2 class="mt-4">Car</h2>
          </v-col>
        </v-row>
        <v-row v-for="car in $store.state.user.profile.cars" v-bind:key="car.id">
          <v-col cols="6">
            <v-text-field readonly v-model="car.plateno" label="Plate number" required></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field readonly v-model="car.regnumber" label="Registration number" required></v-text-field>
          </v-col>
        </v-row>
        <v-row v-if="edit">
          <v-col cols="6">
            <v-text-field v-model="newCar.plateno" label="Plate number" required>
              <v-icon slot="prepend" color="secondary">mdi-car</v-icon>
            </v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="newCar.regnumber" label="Registration number" required></v-text-field>
          </v-col>
        </v-row>
        <hr />
        <v-row>
          <v-col cols="12">
            <h2 class="mt-4">Apartment</h2>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            v-if="$store.state.classifier.classifierHouseType && $store.state.classifier.classifierHouseType[0]"
            cols="6"
          >
            <v-autocomplete
              label="Appartment type"
              item-text="name"
              item-value="id"
              :return-object="false"
              :items="$store.state.classifier.classifierHouseType[0].values"
            >
              <v-icon slot="prepend" color="secondary">mdi-home-outline</v-icon>
            </v-autocomplete>
          </v-col>
          <v-col
            v-if="$store.state.classifier.classifierHouseConstruction && $store.state.classifier.classifierHouseConstruction[0]"
            cols="6"
          >
            <v-autocomplete
              label="Construction type"
              item-text="name"
              item-value="id"
              :return-object="false"
              :items="$store.state.classifier.classifierHouseConstruction[0].values"
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            v-if="$store.state.classifier.classifierHeatingType && $store.state.classifier.classifierHeatingType[0]"
            cols="4"
          >
            <v-autocomplete
              label="Heating type"
              item-text="name"
              item-value="id"
              :return-object="false"
              :items="$store.state.classifier.classifierHeatingType[0].values"
            ></v-autocomplete>
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
        <v-btn color="primary" v-if="edit" @click="updateProfile()">Save</v-btn>
        <v-btn color="primary" v-if="!edit" @click="edit = !edit">Edit</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class UserProfile extends Vue {
  private edit = false;
  private valid = false;
  private alert = false;
  private errorMsg = "";
  private newCar = {
    plateno: "",
    regnumber: ""
  };

  private updateProfile() {
    if (this.newCar.plateno || this.newCar.regnumber) {
      if (this.$store.state.user.profile.cars) {
        this.$store.state.user.profile.cars.push(this.newCar);
      } else {
        this.$store.state.user.profile.cars = [this.newCar];
      }
    }
    this.$store.dispatch("user/updateUserProfile").then(() => {
      this.edit = false;
    });
  }

  mounted() {
    this.$store.dispatch("classifier/getClassifier", "HouseType");
    this.$store.dispatch("classifier/getClassifier", "HouseConstruction");
    this.$store.dispatch("classifier/getClassifier", "HeatingType");
  }
}
</script>
