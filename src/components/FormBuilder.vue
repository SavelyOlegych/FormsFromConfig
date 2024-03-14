<template>
  <div class="form-builder">
    <div
      class="form-builder__form-wrapper"
      v-for="(member, memberType) in formData"
      :key="member.name"
    >
      <h2>{{ member.name }}</h2>
      <form>
        <template v-for="formItem in member.items" :key="member.name + formItem.name">
          <component
            :is="formItemComponent(formItem.type)"
            :name="formItem.name"
            :type="formItem.type"
            :label="formItem.label"
            :options="formItem.additional?.options"
            v-model="formModels[getCurrentModelName(memberType, formItem.name)]"
          />
        </template>
  
        <button type="submit" @click.prevent="sendForm(memberType)">Отправить</button>
        <button type="reset" @click.prevent="clearForm(memberType)">Стереть</button>
      </form>
    </div>
  </div>
</template>

<script>
import FormInput from "@/components/form-items/FormInput.vue";
import FormSelect from "@/components/form-items/FormSelect.vue";
import FormRadio from "@/components/form-items/FormRadio.vue";
import FormPassword from "@/components/form-items/FormPassword.vue";
import formData from "/form-config.json";
import FormBuilderParent from "@/mixins/FormBuilderParent.js";
import FormBuilderChild from "@/mixins/FormBuilderChild.js";

export default {
  name: "FormBuilder",
  components: { FormPassword, FormRadio, FormSelect, FormInput },
  mixins: [
    FormBuilderParent,
    FormBuilderChild,
  ],
  data() {
    return {
      formData,
      formModels: {
        parentName: "",
        parentGender: "female",
        parentAge: "20",
        parentPass: "",
        parentRepeatPass: "",
        childName: "",
        childGender: "male",
        childAge: "10",
        childPass: "",
        childRepeatPass: "",
      }
    }
  },
  methods: {
    formItemComponent(formItemType) {
      return "form-" + formItemType;
    },
    getCurrentModelName(memberType, formItemName) {
      const formItemNameCamelCase = formItemName.includes("-") ?
        formItemName.split("-").reduce((accum, word) => {
          return accum + word[0].toUpperCase() + word.slice(1)
        }, "") :
        formItemName[0].toUpperCase() + formItemName.slice(1)
      ;
      
      return memberType + formItemNameCamelCase;
    },
    sendForm(memberType) {
      switch (memberType) {
        case "parent":
          this.sendParentForm();
          break;
        case "child":
          this.sendChildForm();
          break;
      }
    },
    clearForm(memberType) {
      this.formModels[memberType + "Name"] = "";
      this.formModels[memberType + "Gender"] = "";
      this.formModels[memberType + "Age"] = "";
      this.formModels[memberType + "Pass"] = "";
      this.formModels[memberType + "RepeatPass"] = "";
    },
  },
}
</script>

<style scoped>
.form-builder__form-wrapper {
    margin-bottom: 30px;
}
</style>
