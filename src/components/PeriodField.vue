<template>
  <div>
    <v-menu
      id="fromDate"
      v-model="frommenu"
      :close-on-content-click="false"
      :nudge-right="40"
      transition="scale-transition"
      offset-y
      min-width="290px"
    >
      <template v-slot:activator="{ on }">
        <v-text-field
          :value="fromvalue"
          @change="setFrom"
          label="From Date"
          prepend-icon="event"
          readonly
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker :value="fromvalue" @change="setFrom" @input="frommenu = false"></v-date-picker>
    </v-menu>
    <div id="period">
      <v-autocomplete :value="periodvalue" @change="setPeriod" :return-object="false" :items="list"></v-autocomplete>
    </div>
    <v-menu
      id="toDate"
      v-if="fieldvalue.period===field.periodcode"
      v-model="tomenu"
      :close-on-content-click="false"
      :nudge-right="40"
      transition="scale-transition"
      offset-y
      min-width="290px"
    >
      <template v-slot:activator="{ on }">
        <v-text-field
          :value="tovalue"
          @change="setTo"
          label="To Date"
          prepend-icon="event"
          readonly
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker :value="tovalue" @change="setTo" @input="tomenu = false"></v-date-picker>
    </v-menu>
    <v-text-field :value="daysValue" id="days" type="number" label="Days" readonly></v-text-field>
  </div>
</template>

<script lang="ts">
import moment from "moment";
import { Component, Prop, Vue } from "vue-property-decorator";
import { db } from "@/firebaseConfig";
import { FormFieldDef } from "../schemas/insurer/products";
import { ClassifierItem } from "../schemas/classifier";

interface FieldValue {
  from: string;
  period: string;
  to: string;
}

@Component
export default class PeriodField extends Vue {
  @Prop() private field!: FormFieldDef;
  @Prop() private form!: string;
  private frommenu = false;
  private tomenu = false;
  private list: Array<ClassifierItem> = [];
  private fieldvalue: FieldValue = {
    from: new Date().toISOString().substr(0, 10),
    period: "YEAR",
    to: moment(moment())
      .add(1, "years")
      .toISOString()
      .substr(0, 10)
  };
  // eslint-disable-next-line
  private periodcodes: any = {
    YEAR: { period: "years", amount: 1 },
    WEEK1: { period: "weeks", amount: 1 },
    WEEK2: { period: "weeks", amount: 2 },
    WEEK3: { period: "weeks", amount: 3 },
    WEEK4: { period: "weeks", amount: 4 },
    MONTH1: { period: "months", amount: 1 },
    MONTH2: { period: "months", amount: 2 },
    MONTH3: { period: "months", amount: 3 },
    MONTH4: { period: "months", amount: 4 },
    MONTH5: { period: "months", amount: 5 },
    MONTH6: { period: "months", amount: 6 },
    MONTH7: { period: "months", amount: 7 },
    MONTH8: { period: "months", amount: 8 },
    MONTH9: { period: "months", amount: 9 },
    MONTH10: { period: "months", amount: 10 },
    MONTH11: { period: "months", amount: 11 },
    MONTH12: { period: "months", amount: 12 },
    OTHER: { period: "days", amount: 1 }
  };

  // We use different getter setter because default values
  // anyway are different & getters does not like parameters.
  get periodvalue() {
    this.prepeareFieldValue();
    return this.fieldvalue.period;
  }

  get fromvalue() {
    this.prepeareFieldValue();
    return this.fieldvalue.from;
  }

  get tovalue() {
    this.prepeareFieldValue();
    return this.fieldvalue.to;
  }

  get daysValue() {
    return (
      moment(this.fieldvalue.to).diff(moment(this.fieldvalue.from), "days") + 1
    );
  }

  setPeriod(value: string) {
    this.fieldvalue.period = value;
    this.fieldvalue.to = moment(moment())
      .add(
        this.periodcodes[this.fieldvalue.period].amount,
        this.periodcodes[this.fieldvalue.period].period
      )
      .toISOString()
      .substr(0, 10);
    this.setData(this.fieldvalue);
  }

  setFrom(value: string) {
    this.fieldvalue.from = value;
    this.setData(this.fieldvalue);
  }

  setTo(value: string) {
    this.fieldvalue.to = value;
    this.setData(this.fieldvalue);
  }

  setData(data: FieldValue) {
    this.$store.commit("user/policy/setPolicyField", {
      form: this.form,
      field: this.field.id,
      value: data
    });
  }

  addPeriod() {
    this.fieldvalue.to = moment(moment())
      .add(1, "years")
      .toISOString()
      .substr(0, 10);
  }

  prepeareFieldValue() {
    if (
      this.$store &&
      this.$store.state &&
      this.$store.state.user &&
      this.$store.state.user.policy &&
      this.$store.state.user.policy.policy &&
      this.$store.state.user.policy.policy.data &&
      this.$store.state.user.policy.policy.data[this.form] &&
      this.$store.state.user.policy.policy.data[this.form].fields &&
      this.$store.state.user.policy.policy.data[this.form].fields[this.field.id]
    ) {
      this.fieldvalue = this.$store.state.user.policy.policy.data[
        this.form
      ].fields[this.field.id];
    }
  }

  mounted() {
    // Read classifier if combo
    if (
      this.field.type === "period" &&
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
