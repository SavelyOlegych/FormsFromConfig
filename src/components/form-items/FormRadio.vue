<template>
  <fieldset>
    <legend>{{ label }}</legend>

    <div
        v-for="option in options"
        :key="option.value"
    >
      <input
        type="radio"
        name="radio"
        :id="option.value"
        :value="option.value"
        :checked="option.value === modelValue"
        @change="$emit('update:modelValue', $event.target.value)"
      />
      <label :for="option.value">{{ option.text }}</label>
    </div>
  </fieldset>
</template>

<script>
export default {
  name: "FormRadio",
  props: {
    label: {
      type: String,
      default: ""
    },
    options: {
      type: Object,
      required: true
    },
    modelValue: {
      type: String,
      default: ""
    }
  },
}
</script>

<style scoped>

</style>
