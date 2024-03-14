export default {
  methods: {
    async sendChildForm() {
      if (
        this.formModels.childName &&
        this.formModels.childGender &&
        this.formModels.childAge &&
        this.formModels.childPass &&
        this.formModels.childRepeatPass &&
        this.formModels.childPass === this.formModels.childRepeatPass
      ) {
        const body = {
          name: this.formModels.childName,
          gender: this.formModels.childGender,
          age: +this.formModels.childAge,
          pass: this.formModels.childPass,
        };

        try {
          const response = await fetch('http://localhost/child', {
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