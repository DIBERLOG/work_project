<script>
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.restful-api.dev'
})

export default {
  data() {
    return {
      votes: [],
      title: '',
      description: '',
      error: ''
    }
  },
  methods: {
    async createVote() {
      this.error = ''

      if (!this.title.trim() || !this.description.trim()) {
        this.error = 'Заполни заголовок и описание'
        return
      }

      try {
        const response = await api.post('/objects', {
          name: this.title,
          data: {
            description: this.description,
            positive: 0,
            negative: 0
          }
        })

        this.votes.push(response.data)
        this.title = ''
        this.description = ''
      } catch (error) {
        console.log(error)
        this.error = 'Не удалось создать голосование'
      }
    },

    async removeVote(id) {
      try {
        await api.delete(`/objects/${id}`)
        this.votes = this.votes.filter(vote => vote.id !== id)
      } catch (error) {
        console.log(error)
        this.error = 'Не удалось удалить голосование'
      }
    },

    async positiveVote(vote) {
      try {
        vote.data.positive++

        const response = await api.put(`/objects/${vote.id}`, {
          name: vote.name,
          data: vote.data
        })

        Object.assign(vote, response.data)
      } catch (error) {
        console.log(error)
        this.error = 'Не удалось отправить голос "За"'
      }
    },

    async negativeVote(vote) {
      try {
        vote.data.negative++

        const response = await api.put(`/objects/${vote.id}`, {
          name: vote.name,
          data: vote.data
        })

        Object.assign(vote, response.data)
      } catch (error) {
        console.log(error)
        this.error = 'Не удалось отправить голос "Против"'
      }
    }
  }
}
</script>

<template>
  <div class="vote-layout">
    <div class="left">
      <h1 class="section-title">Текущие голосования</h1>

      <p v-if="error" class="error-text">{{ error }}</p>

      <div v-if="votes.length === 0" class="empty-box">
        Пока голосований нет
      </div>

      <div v-for="vote in votes" :key="vote.id" class="vote-card">
        <div class="vote-title">
          <a href="#">{{ vote.name }}</a>
        </div>

        <div class="vote-body">
          <p>{{ vote.data.description }}</p>

          <div class="vote-actions">
            <div class="vote-buttons">
              <button class="btn btn-outline-success" @click="positiveVote(vote)">
                За <span class="badge success">{{ vote.data.positive }}</span>
              </button>

              <button class="btn btn-outline-danger" @click="negativeVote(vote)">
                Против <span class="badge danger">{{ vote.data.negative }}</span>
              </button>
            </div>

            <button class="btn btn-outline-secondary" @click="removeVote(vote.id)">
              Удалить голосование
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="right">
      <h1 class="section-title">Открыть голосование</h1>

      <label>Заголовок</label>
      <input class="form-control" type="text" v-model="title" />

      <label>Текст описания</label>
      <textarea class="form-control area" v-model="description"></textarea>

      <button class="btn btn-outline-success" @click="createVote">
        Открыть голосование
      </button>
    </div>
  </div>
</template>

<style scoped>
.vote-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(300px, 0.9fr);
  gap: 24px;
}

.left,
.right {
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-md);
  padding: 24px;
  box-shadow: var(--shadow-sm);
}

.section-title {
  font-size: clamp(28px, 2.6vw, 34px);
  font-weight: 800;
  margin: 0 0 24px;
  border-bottom: 1px solid #dde5ef;
  padding-bottom: 12px;
}

.vote-card {
  border: 1px solid rgba(14, 165, 233, 0.22);
  border-radius: 18px;
  overflow: hidden;
  background: white;
  margin-bottom: 22px;
  box-shadow: var(--shadow-sm);
}

.vote-title {
  padding: 16px 20px;
  border-bottom: 1px solid var(--line);
  background: var(--card-muted);
}

.vote-title a {
  font-size: 20px;
  font-weight: 700;
  text-decoration: none;
}

.vote-body {
  padding: 20px;
}

.vote-body p {
  font-size: 17px;
  line-height: 1.6;
  margin: 0 0 18px;
  color: var(--text-secondary);
}

.vote-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.vote-buttons {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.form-control {
  width: 100%;
  box-sizing: border-box;
  margin: 8px 0 16px;
}

.area {
  min-height: 180px;
  resize: vertical;
}

.badge {
  display: inline-block;
  margin-left: 8px;
  padding: 3px 10px;
  border-radius: var(--radius-pill);
  color: white;
  font-weight: 700;
}

.success {
  background: #198754;
}

.danger {
  background: #dc3545;
}

.empty-box {
  padding: 18px;
  border: 1px dashed #cbd5e1;
  border-radius: var(--radius-sm);
  color: #64748b;
}

.error-text {
  color: var(--danger);
  font-weight: 600;
  margin-bottom: 16px;
}

@media (max-width: 900px) {
  .vote-layout {
    grid-template-columns: 1fr;
  }
}
</style>
