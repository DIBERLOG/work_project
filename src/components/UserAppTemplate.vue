<script>
import axios from 'axios'

export default {
  data() {
    return {
      users: ['Nastya', 'Ivan', 'Anton', 'Alex', 'Sofia', 'Olga'],
      age: 0,
      user: '',
      baseURL: 'https://api.agify.io'
    }
  },
  methods: {
    async getAge(user) {
      const response = await axios.get(`${this.baseURL}?name=${user}`)
      this.age = response.data.age
      this.user = user
    }
  }
}
</script>

<template>
  <div class="container-box">
    <div class="users-card">
      <div class="users-head">
        <p class="eyebrow">Agify</p>
        <h3>Возраст пользователя {{ user || '...' }}: {{ age || '—' }}</h3>
      </div>

      <div class="users-grid">
        <div class="user-row" v-for="user in users" :key="user">
          <div>
            <h4>{{ user }}</h4>
            <p>Запрос прогноза возраста по имени</p>
          </div>
          <button class="btn-danger" @click="getAge(user)">Узнать возраст</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container-box {
  max-width: 760px;
}

.users-card {
  padding: 22px;
  border-radius: var(--radius);
  border: 1px solid var(--line);
  background: #fff;
  box-shadow: var(--shadow-sm);
}

.users-head h3 {
  margin: 6px 0 0;
  font-size: 24px;
  font-weight: 700;
}

.eyebrow {
  margin: 0;
  color: var(--muted);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.users-grid {
  display: grid;
  gap: 12px;
  margin-top: 18px;
}

.user-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 16px 18px;
  border-radius: 14px;
  background: var(--card-muted);
  border: 1px solid var(--line);
}

.user-row h4 {
  margin: 0;
  font-size: 22px;
}

.user-row p {
  margin: 6px 0 0;
  color: #64748b;
}

@media (max-width: 720px) {
  .user-row {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
