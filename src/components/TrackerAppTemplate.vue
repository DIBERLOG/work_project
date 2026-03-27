<script>
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.restful-api.dev'
})

export default {
  data() {
    return {
      track: '',
      shipment: null,
      shop: '',
      origin: '',
      destination: '',
      weight: 0.1,
      error: ''
    }
  },
  methods: {
    async createShipment() {
      this.error = ''

      if (!this.shop.trim() || !this.origin.trim() || !this.destination.trim()) {
        this.error = 'Заполни все поля отправления'
        return
      }

      try {
        const response = await api.post('/objects', {
          name: this.shop,
          data: {
            origin: this.origin,
            destination: this.destination,
            weight: this.weight,
            status: 'Отправление зарегистрировано'
          }
        })

        this.shipment = response.data
        this.track = response.data.id

        this.shop = ''
        this.origin = ''
        this.destination = ''
        this.weight = 0.1
      } catch (error) {
        console.log(error)
        this.error = 'Не удалось создать отправление'
      }
    },

    async loadShipment(id) {
      this.error = ''

      if (!id || !id.trim()) {
        this.error = 'Введи трек-код'
        return
      }

      try {
        const response = await api.get(`/objects/${id}`)
        this.shipment = response.data
      } catch (error) {
        console.log(error)
        this.error = 'Посылка не найдена'
        this.shipment = null
      }
    },

    async removeShipment(id) {
      this.error = ''

      try {
        await api.delete(`/objects/${id}`)
        this.shipment = null
        this.track = ''
      } catch (error) {
        console.log(error)
        this.error = 'Не удалось удалить отправление'
      }
    }
  }
}
</script>

<template>
  <div class="tracker-layout">
    <div class="left">
      <div class="panel">
        <label for="track" class="form-label">Отследить посылку:</label>
        <input class="form-control mb-3" type="text" id="track" v-model="track" />
        <button class="btn btn-success" @click="loadShipment(track)">Отследить</button>

        <p v-if="error" class="error-text mt-3">{{ error }}</p>

        <h1 class="section-title">Посылка</h1>

        <div v-if="shipment" class="shipment-card">
          <div class="shipment-head">
            <h3>{{ shipment.data.status }}</h3>
            <p>Трек-код: <a href="#">{{ shipment.id }}</a></p>
            <p>Отправитель: <a href="#">{{ shipment.name }}</a></p>
          </div>

          <div class="shipment-body">
            <p>Город отправления: {{ shipment.data.origin }}</p>
            <p>Город прибытия: {{ shipment.data.destination }}</p>
            <p>Вес: {{ shipment.data.weight }} кг</p>

            <button
              type="button"
              class="shipment-remove btn btn-outline-secondary"
              @click="removeShipment(shipment.id)"
            >
              Удалить отправление
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="right">
      <div class="panel">
        <h1 class="section-title">Создать отправление</h1>

        <label class="form-label">Отправитель</label>
        <input class="form-control mb-3" type="text" v-model="shop" />

        <label class="form-label">Город отправления</label>
        <input class="form-control mb-3" type="text" v-model="origin" />

        <label class="form-label">Город получателя</label>
        <input class="form-control mb-3" type="text" v-model="destination" />

        <label class="form-label">Вес посылки в кг: {{ weight }}</label>
        <input
          class="form-range mb-3"
          type="range"
          min="0.1"
          max="10"
          step="0.1"
          v-model="weight"
        />

        <button class="btn btn-outline-success" @click="createShipment">
          Зарегистрировать отправление
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tracker-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(300px, 0.9fr);
  gap: 24px;
}

.panel {
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-md);
  padding: 24px;
  box-shadow: var(--shadow-sm);
}

.section-title {
  font-size: clamp(28px, 2.6vw, 34px);
  font-weight: 800;
  margin: 32px 0 20px;
  border-bottom: 1px solid #dde5ef;
  padding-bottom: 12px;
}

.form-label {
  font-weight: 500;
}

.shipment-card {
  margin-top: 24px;
  border: 1px solid rgba(14, 165, 233, 0.24);
  border-radius: 18px;
  overflow: hidden;
  background: white;
  box-shadow: var(--shadow-sm);
}

.shipment-head {
  padding: 18px 20px;
  background: linear-gradient(135deg, #eff6ff, #f5f3ff);
  border-bottom: 1px solid rgba(14, 165, 233, 0.16);
}

.shipment-head h3 {
  margin: 0 0 12px;
  font-size: 28px;
}

.shipment-head p {
  margin: 6px 0;
}

.shipment-body {
  padding: 20px;
}

.shipment-body p {
  font-size: 17px;
  margin: 0 0 14px;
  color: var(--text-secondary);
}

.shipment-remove {
  margin-top: 10px;
}

.error-text {
  color: var(--danger);
  font-weight: 600;
}

@media (max-width: 900px) {
  .tracker-layout {
    grid-template-columns: 1fr;
  }
}
</style>
