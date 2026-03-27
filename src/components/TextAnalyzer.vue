<script>
export default {
  data() {
    return {
      text: ''
    }
  },
  computed: {
    characterCount() {
      return this.text.length
    },
    reversedText() {
      return this.text.split('').reverse().join('')
    }
  }
}
</script>

<template>
  <div class="analyzer-wrap">
    <div class="box">
      <p class="eyebrow">Работа с текстом</p>
      <input class="input" type="text" v-model="text" placeholder="Введи текст" />

      <div class="stats-grid">
        <div class="stat-card">
          <span>Текст</span>
          <strong>{{ text || '...' }}</strong>
        </div>
        <div class="stat-card">
          <span>Количество символов</span>
          <strong>{{ characterCount }}</strong>
        </div>
        <div class="stat-card stat-card-wide">
          <span>Перевёрнутый текст</span>
          <strong>{{ reversedText || '...' }}</strong>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.analyzer-wrap {
  display: flex;
  justify-content: center;
}

.box {
  width: min(100%, 720px);
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

.input {
  width: 100%;
  padding: 16px 18px;
  margin-bottom: 18px;
  font-size: 18px;
  text-align: center;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.stat-card {
  padding: 20px;
  border-radius: 22px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(241, 245, 249, 0.94));
  border: 1px solid rgba(148, 163, 184, 0.18);
  text-align: left;
}

.stat-card span {
  display: block;
  margin-bottom: 8px;
  color: #64748b;
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.stat-card strong {
  display: block;
  color: #0f172a;
  font-size: 20px;
  line-height: 1.4;
  word-break: break-word;
}

.stat-card-wide {
  grid-column: 1 / -1;
}

@media (max-width: 640px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .stat-card-wide {
    grid-column: auto;
  }
}
</style>
