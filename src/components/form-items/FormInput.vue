<template>
  <div>
    <p>{{ label }}</p>
    <input
        v-bind="$attrs"
        :type="type"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.currentTarget.value)"
    />
  </div>
</template>

<script>
export default {
  name: "FormInput",
  props: {
    label: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "text"
    },
    modelValue: {
      type: String,
      default: ""
    }
  }
}
</script>

<style scoped>

</style>
