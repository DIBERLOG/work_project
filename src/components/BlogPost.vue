<script>
export default {
  props: {
    post: Object,
    fontSize: Number
  },
  data() {
    return {
      fontSizeNew: ''
    }
  }
}
</script>

<template>
  <div class="card">
    <div class="card-body">
      <div class="meta-row">
        <p class="card-subtitle">{{ post.author }}</p>
        <small class="date">{{ post.date }}</small>
      </div>

      <h3 class="card-title">{{ post.title }}</h3>

      <p class="card-text" :style="{ fontSize: fontSize + 'px' }">
        {{ post.text }}
      </p>

      <div class="controls">
        <button @click="$emit('fontSizeDecrease')">-</button>
        <button @click="$emit('fontSizeIncrease')">+</button>

        <input v-model="fontSizeNew" type="number" placeholder="px" />
        <button @click="$emit('fontSizeSet', fontSizeNew)">Установить</button>
        <button @click="$emit('fontSizeSet', 20)">20 px</button>
      </div>

      <hr />

      <h4>Комментарии:</h4>
      <ul class="comment-list">
        <li v-for="comment in post.comments" :key="comment">
          Аноним: {{ comment }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.card {
  background: #fff;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 20px;
  box-shadow: var(--shadow-sm);
}

.meta-row {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
}

.card-subtitle {
  margin: 0;
  color: #64748b;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.card-title {
  margin: 10px 0 14px;
  font-size: 25px;
  line-height: 1.2;
  font-weight: 700;
}

.card-text {
  margin-bottom: 16px;
  color: var(--text-soft);
  line-height: 1.7;
}

.controls {
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.controls input {
  width: 90px;
  padding: 8px 10px;
  border: 1px solid rgba(101, 116, 139, 0.18);
  border-radius: 14px;
}

.controls button {
  padding: 10px 12px;
  cursor: pointer;
}

.date {
  color: #64748b;
  font-weight: 700;
}

hr {
  border: none;
  border-top: 1px solid rgba(101, 116, 139, 0.16);
  margin: 18px 0;
}

.comment-list {
  display: grid;
  gap: 10px;
  padding-left: 18px;
  color: var(--text-soft);
}

@media (max-width: 720px) {
  .meta-row {
    flex-direction: column;
    align-items: flex-start;
  }

  .card-title {
    font-size: 24px;
  }
}
</style>
