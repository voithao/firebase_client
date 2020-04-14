<template>
  <div>
    <v-text-field
      :id="field.id"
      v-if="field.type === 'text' && visible"
      :value="value"
      @change="setData"
      :label="field.label"
    ></v-text-field>
    <v-text-field
      :id="field.id"
      type="number"
      v-if="field.type === 'number' && visible"
      :value="value"
      @change="setData"
      :label="field.label"
    ></v-text-field>
    <div :id="field.id" v-if="field.type === 'dropbox'">
      <v-autocomplete :value="value" @change="setData" :return-object="false" :items="list"></v-autocomplete>
    </div>
    <v-menu
      :id="field.id"
      v-if="field.type === 'date' && visible"
      v-model="menu"
      :close-on-content-click="false"
      :nudge-right="40"
      transition="scale-transition"
      offset-y
      min-width="290px"
    >
      <template v-slot:activator="{ on }">
        <v-text-field
          :value="value"
          @change="setData"
          :label="field.label"
          prepend-icon="event"
          readonly
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker :value="value" @change="setData" @input="menu = false"></v-date-picker>
    </v-menu>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { db } from "@/firebaseConfig";

@Component
export default class ProductField extends Vue {
  @Prop() private field!: Record<string, any>;
  @Prop() private form!: string;
  private menu = false;
  private list: Array<any> = [];
  private mydata: any;

  get visible(): boolean {
    if (this.field && this.field.visible) {
      // console.log(this.$store.state.policy.data['base'].fields['period']=='Other')
      try {
        return eval(`${this.prepeareFunction(this.field.visible)}`);
      } catch (error) {
        return true;
      }
    } else {
      return true;
    }
  }

  get value(): any {
    if (this.field.calculated === undefined) {
      return this.$store.state.policy.data[this.form].fields[this.field.id];
    } else {
      return eval(`${this.prepeareFunction(this.field.calculated)}`);
    }
  }

  get data() {
    if (
      this.$store &&
      this.$store.state &&
      this.$store.state.policy &&
      this.$store.state.policy.data &&
      this.$store.state.policy.data[this.form] &&
      this.$store.state.policy.data[this.form].fields &&
      this.$store.state.policy.data[this.form].fields[this.field.id]
    ) {
      return this.$store.state.policy.data[this.form].fields[this.field.id];
    } else {
      if (this.field) {
        if (this.field.type === "date") {
          return new Date().toISOString().substr(0, 10);
        }
        if (this.field.type === "number") {
          return 0;
        }
        if (this.field.type === "text") {
          return "";
        }
        if (this.field.type === "dropbox") {
          return "";
        }
      }
      return "";
    }
  }

  prepeareFunction(funcText: string): string {
    return funcText.split("{{policy}}").join("this.$store.state.policy");
  }

  setData(data: any) {
    this.$store.commit("setPolicyField", {
      form: this.form,
      field: this.field.id,
      value: data
    });
  }

  mounted() {
    // Read classifier if combo
    if (
      this.field.type === "dropbox" &&
      this.field.select &&
      this.field.select.type === "classifier" &&
      this.field.select.params &&
      this.field.select.params.name
    ) {
      db.collection("classifier")
        .where("name", "==", this.field.select.params.name)
        .get()
        .then(querySnapshot => {
          const data = querySnapshot.docs.map(doc => doc.data());
          if (data.length > 0 && data[0].values) {
            this.list = data[0].values;
          }
        });
    }
  }
}
</script>
