<script>
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    up() {
      this.count++
    },
    down() {
      this.count--
    }
  }
}
</script>

<template>
  <div class="clicker-wrap">
    <div class="clicker-card">
      <p class="clicker-label">Учебный счётчик</p>
      <div class="clicker">
        <button class="btn btn-minus" @click="down">−</button>
        <span>{{ count }}</span>
        <button class="btn btn-plus" @click="up">+</button>
      </div>
      <p class="clicker-hint">Меняй значение кнопками слева и справа</p>
    </div>
  </div>
</template>

<style scoped>
.clicker-wrap {
  display: flex;
  justify-content: center;
}

.clicker-card {
  width: min(100%, 520px);
  padding: 28px;
  border-radius: 24px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(241, 245, 249, 0.94));
  border: 1px solid rgba(148, 163, 184, 0.18);
  box-shadow: 0 20px 34px rgba(15, 23, 42, 0.08);
  text-align: center;
}

.clicker-label {
  margin: 0 0 18px;
  font-size: 13px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: #64748b;
}

.clicker {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  user-select: none;
}

.clicker span {
  min-width: 96px;
  text-align: center;
  font-size: 44px;
  font-weight: 900;
  color: #0f172a;
}

.btn {
  width: 64px;
  height: 64px;
  border: none;
  border-radius: 20px;
  color: white;
  font-size: 30px;
  font-weight: 900;
  cursor: pointer;
  box-shadow: 0 14px 24px rgba(15, 23, 42, 0.14);
}

.btn-minus {
  background: linear-gradient(135deg, #dc2626, #f97316);
}

.btn-plus {
  background: linear-gradient(135deg, #1d4ed8, #0f766e);
}

.clicker-hint {
  margin: 18px 0 0;
  color: #64748b;
}

@media (max-width: 640px) {
  .clicker-card {
    padding: 20px;
  }

  .clicker {
    gap: 14px;
  }

  .clicker span {
    min-width: 72px;
    font-size: 36px;
  }

  .btn {
    width: 56px;
    height: 56px;
  }
}
</style>
