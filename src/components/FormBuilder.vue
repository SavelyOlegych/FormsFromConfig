<template>
  <div class="form-builder">
    <div
      class="form-builder__form-wrapper"
      v-for="(member, memberType) in formData"
      :key="member.name"
    >
      <h2>{{ member.name }}</h2>
      <form :id="memberType + 'Form'" @submit.prevent>
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
  
        <button type="submit" @click="sendForm(memberType)">Отправить</button>
        <button type="reset" @click.prevent="setDefaultModelsValues(memberType)">Стереть</button>
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
      formModels: {},
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
    setDefaultModelsValues(memberType) {
      this.formData[memberType].items.forEach(item => {
        this.formModels[this.getCurrentModelName(memberType, item.name)] =
          item.type === "select" ? item.additional.options[0].value : "";
      });
    },
    passwordValidation(form) {
      const passInput = form.querySelector("input[name='pass']");
      const repeatPassInput = form.querySelector("input[name='repeat-pass']");

      passInput.addEventListener("input", () => passInput.setCustomValidity(""));
      repeatPassInput.addEventListener("input", () => repeatPassInput.setCustomValidity(""));

      if (passInput.validity.valueMissing) {
        passInput.setCustomValidity("Введите пароль");
      } else {
        passInput.setCustomValidity("");
      }

      if (passInput.value !== repeatPassInput.value) {
        repeatPassInput.setCustomValidity("Пароли не совпадают");
      } else {
        repeatPassInput.setCustomValidity("");
      }
    },
    sendForm(memberType) {
      switch (memberType) {
        case "parent":
          this.validateParentForm();
          this.sendParentForm();
          break;
        case "child":
          this.validateChildForm();
          this.sendChildForm();
          break;
      }
    },
  },
  mounted() {
    for (const memberType of Object.keys(this.formData)) {
      this.setDefaultModelsValues(memberType);
    }
  },
}
</script>

<style scoped>
.form-builder__form-wrapper {
    margin-bottom: 30px;
}
</style>
