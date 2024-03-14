export default {
  methods: {
    async sendParentForm() {
      if (
        this.formModels.parentName &&
        this.formModels.parentGender &&
        this.formModels.parentAge &&
        this.formModels.parentPass &&
        this.formModels.parentRepeatPass &&
        this.formModels.parentPass === this.formModels.parentRepeatPass
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