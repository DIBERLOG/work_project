<script>
export default {
  data() {
    return {
      personType: '',
      color: '',
      result: '',
      isShown: false
    }
  },
  methods: {
    showResult() {
      if (this.personType === 'smart' && this.color === 'green') {
        this.result = 'Поздравляем, вы — брокколи'
      } else if (this.personType === 'smart' && this.color === 'red') {
        this.result = 'Поздравляем, вы — помидор'
      } else if (this.personType === 'beautiful' && this.color === 'green') {
        this.result = 'Поздравляем, вы — огурец'
      } else if (this.personType === 'beautiful' && this.color === 'red') {
        this.result = 'Поздравляем, вы — болгарский перец'
      } else {
        this.result = 'Сначала выбери оба варианта'
      }

      this.isShown = true
    }
  }
}
</script>

<template>
  <div class="test-card">
    <h1>Каким лучше быть?</h1>

    <div class="radio-row">
      <label><input type="radio" v-model="personType" value="smart" /> Умным</label>
      <label><input type="radio" v-model="personType" value="beautiful" /> Красивым</label>
    </div>

    <h1>Выбери цвет:</h1>

    <div class="radio-row">
      <label><input type="radio" v-model="color" value="green" /> Зелёный</label>
      <label><input type="radio" v-model="color" value="red" /> Красный</label>
    </div>

    <button class="show-btn" @click="showResult">Показать ответ</button>

    <div class="result-box" v-if="isShown">
      {{ result }}
    </div>
  </div>
</template>

<style scoped>
.test-card {
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-md);
  padding: 28px;
  background: rgba(255, 255, 255, 0.92);
  box-shadow: var(--shadow-sm);
}
.radio-row {
  display: flex;
  gap: 20px;
  margin: 16px 0 24px;
  flex-wrap: wrap;
}
.radio-row label {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
}
.result-box {
  margin-top: 24px;
  padding: 22px;
  background: linear-gradient(135deg, #e0f2fe, #ecfeff);
  color: #16576a;
  border: 1px solid rgba(8, 145, 178, 0.14);
  border-radius: var(--radius-sm);
  font-size: 20px;
  font-weight: 700;
}
h1 {
  margin: 0 0 10px;
  font-size: clamp(24px, 3vw, 30px);
}

@media (max-width: 640px) {
  .test-card {
    padding: 20px;
  }

  .radio-row label {
    font-size: 16px;
  }
}
</style>
