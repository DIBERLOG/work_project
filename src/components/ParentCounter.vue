<script>
import SubComponent from './SubComponent.vue'

export default {
  components: {
    SubComponent
  },
  data() {
    return {
      counter: 0
    }
  }
}
</script>

<template>
  <div class="parent-wrap">
    <div class="parent-box">
      <div class="counter-column">
        <h4>Кнопка в родительском компоненте</h4>
        <button class="counter-btn parent-btn" @click="counter++">
          {{ counter }}
        </button>
      </div>

      <SubComponent :counter="counter" @counterPlus="counter++" />
    </div>
  </div>
</template>

<style scoped>
.parent-wrap {
  display: flex;
  justify-content: center;
}

.parent-box {
  width: min(100%, 760px);
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
  align-items: stretch;
}

.counter-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 24px;
  border-radius: 24px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(241, 245, 249, 0.94));
  border: 1px solid rgba(148, 163, 184, 0.18);
}

.counter-column h4 {
  margin: 0;
  text-align: center;
  font-size: 22px;
}

.counter-btn {
  width: 96px;
  height: 96px;
  border: none;
  border-radius: 24px;
  color: white;
  font-size: 34px;
  font-weight: 900;
  cursor: pointer;
  box-shadow: 0 16px 28px rgba(15, 23, 42, 0.14);
}

.parent-btn {
  background: linear-gradient(135deg, #1d4ed8, #0f766e);
}

@media (max-width: 720px) {
  .parent-box {
    grid-template-columns: 1fr;
  }
}
</style>
