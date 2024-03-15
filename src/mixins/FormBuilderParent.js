export default {
  methods: {
    validateParentForm() {
      this.passwordValidation(document.querySelector("#parentForm"));
    },
    async sendParentForm() {
      if (
        this.formModels.parentName &&
        this.formModels.parentGender &&
        this.formModels.parentAge
      ) {
        const body = {
          name: this.formModels.parentName,
          gender: this.formModels.parentGender,
          age: +this.formModels.parentAge,
          pass: this.formModels.parentPass,
        };

        try {
          const response = await fetch('http://localhost/parent', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
          });
          const result = await response.json()

          console.log(result)
        } catch (e) {
          console.log(e)
        }
      }
    },
  }
}