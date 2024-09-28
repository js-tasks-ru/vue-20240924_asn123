import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  name: 'CalculatorApp',

  setup() {
    const operand1 = ref(0)

    const operand2 = ref(0)

    const operator = ref('sum')

    const operationResult = computed(() => {
      switch (operator.value) {
        case 'sum':
          return operand1.value + operand2.value
        case 'subtract':
          return operand1.value - operand2.value
        case 'multiply':
          return operand1.value * operand2.value
        case 'divide':
          return operand1.value / operand2.value
        default:
          return NaN
      }
    })

    return {
      operand1: operand1,
      operand2: operand2,
      operator: operator,
      operationResult: operationResult,
    }
  },

  template: `
    <div class="calculator">
      <input v-model="operand1" type="number" aria-label="First operand" />

      <div class="calculator__operators">
        <label><input v-model="operator" type="radio" name="operator" value="sum"/>➕</label>
        <label><input v-model="operator" type="radio" name="operator" value="subtract"/>➖</label>
        <label><input v-model="operator" type="radio" name="operator" value="multiply"/>✖</label>
        <label><input v-model="operator" type="radio" name="operator" value="divide"/>➗</label>
      </div>

      <input v-model="operand2" type="number" aria-label="Second operand" />

      <div>=</div>

      <output>{{ operationResult }}</output>
    </div>
  `,
})
