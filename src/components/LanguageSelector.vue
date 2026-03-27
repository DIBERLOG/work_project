<script>
export default {
  data() {
    return {
      langs: {
        Русский: 'Привет, мир!',
        English: 'Hello world!',
        Français: 'Bonjour le monde!'
      },
      currentLang: ''
    }
  }
}
</script>

<template>
  <div class="lang-wrap">
    <div class="lang-box">
      <p class="eyebrow">Учебный выбор</p>
      <select class="select" v-model="currentLang">
        <option value="">Выбери язык:</option>
        <option v-for="(value, name) in langs" :key="name" :value="name">
          {{ name }}
        </option>
      </select>

      <div v-if="langs[currentLang]" class="result-card">
        <span class="result-label">Результат</span>
        <p class="result">{{ langs[currentLang] }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.lang-wrap {
  display: flex;
  justify-content: center;
}

.lang-box {
  width: min(100%, 640px);
  text-align: center;
}

.eyebrow {
  margin: 0 0 14px;
  color: #64748b;
  font-size: 13px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.18em;
}

.select {
  width: 100%;
  padding: 16px 18px;
  font-size: 18px;
  text-align: center;
  border-radius: 18px;
}

.result-card {
  margin-top: 18px;
  padding: 22px;
  border-radius: 24px;
  background: linear-gradient(135deg, rgba(239, 246, 255, 0.94), rgba(255, 255, 255, 0.96));
  border: 1px solid rgba(148, 163, 184, 0.16);
}

.result-label {
  display: block;
  margin-bottom: 8px;
  color: #64748b;
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.result {
  margin: 0;
  font-size: 30px;
  font-weight: 900;
  color: #0f172a;
}
</style>
