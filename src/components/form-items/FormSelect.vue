<template>
  <div>
    <p>{{ label }}</p>
    <select @change="changeOption">
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :selected="option.value === modelValue"
      >
        {{ option.text }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "FormSelect",
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
  methods: {
    changeOption(e) {
      this.$emit(
        "update:modelValue",
        Array.from(e.target)
          .find(item => item.selected === true)
          .value
      )
    }
  }
}
</script>

<style scoped>

</style>
