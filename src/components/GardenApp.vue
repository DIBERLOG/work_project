<script>
import axios from 'axios'

import potatoImg from '../assets/potato.png'
import strawberryImg from '../assets/strawberry.png'
import basilImg from '../assets/basil.png'
import backgroundImg from '../assets/background.jpg'

const api = axios.create({
  baseURL: import.meta.env.PROD ? '' : 'http://localhost:3005'
})

export default {
  data() {
    return {
      shop: [],
      plants: [],
      gold: 0,
      plantIndex: 0,
      count: 1,
      error: '',
      refreshTimer: null,
      images: {
        potato: potatoImg,
        strawberry: strawberryImg,
        basil: basilImg
      },
      backgroundImg
    }
  },

  computed: {
    selectedPlant() {
      return this.shop[this.plantIndex] || null
    },

    totalPrice() {
      return this.selectedPlant ? this.selectedPlant.buyPrice * Number(this.count) : 0
    },

    totalSellPrice() {
      return this.selectedPlant ? this.selectedPlant.sellPrice * Number(this.count) : 0
    },

    readyPlants() {
      return this.plants.filter(item => this.isPlantReady(item)).length
    }
  },

  methods: {
    isPlantReady(item) {
      if (!item.timeToHarvest) return true

      const now = new Date()
      const [h, m] = item.timeToHarvest.split(':')
      const harvestDate = new Date()
      harvestDate.setHours(Number(h), Number(m), 0, 0)

      return harvestDate <= now
    },

    async loadShop() {
      try {
        const response = await api.get('/shop')
        this.shop = response.data
      } catch (error) {
        console.log(error)
        this.error = 'Не удалось загрузить магазин'
      }
    },

    async loadUser() {
      try {
        const response = await api.get('/user')
        this.gold = response.data.gold
      } catch (error) {
        console.log(error)
        this.error = 'Не удалось загрузить баланс'
      }
    },

    async loadGarden() {
      try {
        const response = await api.get('/garden')
        this.plants = response.data
      } catch (error) {
        console.log(error)
        this.error = 'Не удалось загрузить огород'
      }
    },

    async buy() {
      this.error = ''

      try {
        await api.post('/shop/buy', {
          id: this.plantIndex,
          count: Number(this.count)
        })

        await this.loadUser()
        await this.loadGarden()
      } catch (error) {
        console.log(error)
        this.error = 'Не удалось купить растение'
      }
    },

    async harvest(item) {
      this.error = ''

      try {
        await api.post('/garden/harvest', {
          id: item.id
        })

        await this.loadGarden()
        await this.loadUser()
      } catch (error) {
        console.log(error)
        this.error = 'Не удалось собрать урожай'
      }
    },

    getPlantTime(item) {
      if (!item.timeToHarvest || this.isPlantReady(item)) {
        return 'Готово!'
      }

      return `До ${item.timeToHarvest}`
    }
  },

  mounted() {
    this.loadShop()
    this.loadUser()
    this.loadGarden()

    this.refreshTimer = setInterval(() => {
      this.loadShop()
      this.loadGarden()
    }, 3000)
  },

  beforeUnmount() {
    if (this.refreshTimer) {
      clearInterval(this.refreshTimer)
    }
  }
}
</script>

<template>
  <div class="garden-app">
    <div class="garden-hero">
      <div class="hero-copy">
        <p class="eyebrow">Ферма</p>
        <h2 class="page-title">Магазин, посадка и сбор урожая</h2>
        <p class="page-subtitle">
          Выбирай растение, сразу видь стоимость и забирай готовый урожай одним кликом.
        </p>
      </div>

      <div class="hero-stats">
        <div class="stat-chip stat-chip-gold">
          <span class="stat-label">Баланс</span>
          <strong>$ {{ gold }}</strong>
        </div>
        <div class="stat-chip">
          <span class="stat-label">В огороде</span>
          <strong>{{ plants.length }}</strong>
        </div>
        <div class="stat-chip">
          <span class="stat-label">Готово к сбору</span>
          <strong>{{ readyPlants }}</strong>
        </div>
      </div>
    </div>

    <p v-if="error" class="alert-line">{{ error }}</p>

    <div class="shop-panel">
      <div class="shop-left">
        <div class="section-head">
          <div>
            <h3>Семена</h3>
            <span class="section-hint">Выбери одну позицию</span>
          </div>
        </div>

        <div class="shop-plants">
          <label
            class="shop-item"
            v-for="(item, index) in shop"
            :key="index"
            :class="{ 'is-active': plantIndex === index }"
          >
            <input class="shop-radio" type="radio" v-model="plantIndex" :value="index" />
            <img :src="images[item.image]" class="shop-image" />
            <p class="shop-title">{{ item.title }}</p>
            <div class="shop-meta">
              <span class="meta-pill meta-pill-buy">Купить ${{ item.buyPrice }}</span>
              <span class="meta-pill">Продать ${{ item.sellPrice }}</span>
            </div>
          </label>
        </div>
      </div>

      <div class="shop-right">
        <div class="summary-card">
          <div class="section-head compact">
            <div>
              <h3>Покупка</h3>
              <span class="section-hint">Текущий выбор</span>
            </div>
          </div>

          <div class="selected-preview" v-if="selectedPlant">
            <img :src="images[selectedPlant.image]" class="selected-image" />
            <div>
              <p class="selected-title">{{ selectedPlant.title }}</p>
              <p class="selected-text">Рост: {{ selectedPlant.growTime }} мин</p>
            </div>
          </div>

          <div class="shop-info-row">
            <div class="shop-info-left">Количество</div>
            <input type="number" min="1" v-model="count" class="count-input form-control" />
          </div>

          <div class="shop-info-row">
            <div class="shop-info-left">Итог покупки</div>
            <div class="shop-info-right price-value">$ {{ totalPrice }}</div>
          </div>

          <div class="shop-info-row">
            <div class="shop-info-left">Потенциальная продажа</div>
            <div class="shop-info-right price-value price-value-soft">$ {{ totalSellPrice }}</div>
          </div>

          <button class="btn btn-primary plant-btn" @click="buy">Посадить семена</button>
        </div>
      </div>
    </div>

    <div class="field-card">
      <div class="section-head">
        <div>
          <h3>Огород</h3>
          <span class="section-hint">Нажми на готовое растение, чтобы собрать урожай</span>
        </div>
      </div>

      <div
        class="garden-field"
        :style="{ backgroundImage: `linear-gradient(180deg, rgba(10, 14, 24, 0.12), rgba(10, 14, 24, 0.42)), url(${backgroundImg})` }"
      >
        <div v-if="!plants.length" class="empty-state">
          <p>Пока пусто. Купи растение выше, и оно появится здесь.</p>
        </div>

        <button
          type="button"
          class="garden-item"
          v-for="item in plants"
          :key="item.id"
          @click="harvest(item)"
        >
          <img :src="images[item.image]" class="garden-image" />
          <span class="garden-title">{{ item.title }}</span>
          <span class="garden-chip" :class="{ 'is-ready': isPlantReady(item) }">
            {{ getPlantTime(item) }}
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.garden-app {
  background: #fff;
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.garden-hero {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 18px;
  padding: 24px 24px 0;
}

.eyebrow {
  margin: 0 0 8px;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 12px;
  font-weight: 800;
  color: #5b6b86;
}

.page-title {
  margin: 0;
  font-size: clamp(28px, 3.1vw, 34px);
  line-height: 1.05;
  color: #0f172a;
}

.page-subtitle {
  margin: 10px 0 0;
  color: #64748b;
  max-width: 64ch;
}

.hero-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: flex-end;
}

.stat-chip {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 112px;
  padding: 12px 16px;
  border-radius: var(--radius-pill);
  background: #eef4ff;
  color: #19305e;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.02em;
}

.stat-chip-gold {
  background: #e8eefc;
  color: #1e40af;
}

.stat-chip-gold strong {
  color: inherit;
}

.stat-label {
  font-size: 11px;
  opacity: 0.78;
  margin-bottom: 4px;
  font-weight: 700;
}

.alert-line {
  margin: 18px 24px 0;
  padding: 12px 14px;
  color: var(--danger);
  background: var(--danger-soft);
  border: 1px solid rgba(180, 35, 24, 0.14);
  border-radius: var(--radius-sm);
  font-weight: 700;
}

.shop-panel {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(300px, 0.95fr);
  gap: 22px;
  padding: 24px;
}

.shop-plants {
  display: flex;
  gap: 16px;
  align-items: stretch;
  flex-wrap: wrap;
}

.shop-item {
  width: min(100%, 186px);
  text-align: left;
  cursor: pointer;
  background: #fff;
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-md);
  padding: 14px;
  box-shadow: var(--shadow-sm);
  position: relative;
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}

.shop-item.is-active {
  border-color: rgba(37, 99, 235, 0.45);
  box-shadow: 0 14px 30px rgba(37, 99, 235, 0.12);
  transform: translateY(-2px);
}

.shop-item:hover,
.garden-item:hover {
  transform: translateY(-2px);
}

.shop-radio {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.shop-image {
  width: 100%;
  height: 118px;
  object-fit: contain;
  margin-bottom: 10px;
}

.shop-title {
  font-size: 18px;
  margin: 0 0 10px;
  font-weight: 800;
  color: #0f172a;
}

.shop-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.meta-pill,
.garden-chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-pill);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.02em;
}

.meta-pill {
  padding: 7px 10px;
  background: #eef4ff;
  color: #3554a5;
}

.meta-pill-buy {
  background: #e8f3e8;
  color: #1f6d3d;
}

.summary-card,
.field-card {
  background: rgba(255, 255, 255, 0.88);
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-md);
  padding: 20px;
  box-shadow: var(--shadow-sm);
}

.shop-right {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 14px;
}

.shop-info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  border-top: 1px solid #edf2f7;
  font-size: 16px;
}

.shop-info-row:first-of-type {
  border-top: 0;
}

.shop-info-left {
  color: #475569;
  font-weight: 700;
}

.count-input {
  width: 110px;
  font-size: 18px;
  border-radius: var(--radius-sm) !important;
}

.plant-btn {
  align-self: stretch;
  font-size: 16px;
  padding: 12px 18px;
  margin-top: 6px;
  border-radius: var(--radius-sm) !important;
}

.section-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 14px;
}

.section-head h3 {
  margin: 0;
  font-size: 20px;
  color: #0f172a;
}

.section-head.compact {
  margin-bottom: 12px;
}

.section-hint {
  color: #64748b;
  font-size: 13px;
}

.selected-preview {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px;
  background: var(--card-muted);
  border: 1px solid var(--line);
  border-radius: 18px;
  margin-bottom: 14px;
}

.selected-image {
  width: 56px;
  height: 56px;
  object-fit: contain;
}

.selected-title {
  margin: 0 0 4px;
  font-size: 16px;
  font-weight: 800;
}

.selected-text {
  margin: 0;
  color: #64748b;
  font-size: 13px;
}

.price-value {
  font-weight: 800;
  color: #0f172a;
}

.price-value-soft {
  color: #1f6d3d;
}

.field-card {
  margin: 0 24px 24px;
  padding: 18px;
}

.garden-field {
  min-height: 320px;
  padding: 18px;
  background-size: cover;
  background-position: center;
  border-radius: var(--radius-md);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(132px, 1fr));
  gap: 14px;
  align-items: start;
}

.empty-state {
  grid-column: 1 / -1;
  padding: 28px;
  text-align: center;
  color: white;
  font-weight: 700;
  background: rgba(15, 23, 42, 0.26);
  border: 1px dashed rgba(255, 255, 255, 0.55);
  border-radius: 18px;
  backdrop-filter: blur(2px);
}

.garden-item {
  border: 1px solid rgba(255, 255, 255, 0.28);
  background: rgba(255, 255, 255, 0.16);
  backdrop-filter: blur(3px);
  border-radius: 18px;
  padding: 14px 12px 12px;
  text-align: center;
  color: white;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  box-shadow: 0 12px 24px rgba(15, 23, 42, 0.12);
  transition: transform 0.2s ease, background 0.2s ease;
}

.garden-image {
  width: 82px;
  height: 82px;
  object-fit: contain;
}

.garden-title {
  font-size: 14px;
  font-weight: 800;
}

.garden-chip {
  padding: 6px 10px;
  background: rgba(15, 23, 42, 0.56);
  color: white;
}

.garden-chip.is-ready {
  background: rgba(22, 101, 52, 0.9);
}

@media (max-width: 900px) {
  .garden-hero,
  .shop-panel {
    display: grid;
    grid-template-columns: 1fr;
  }

  .garden-hero {
    padding: 18px 18px 0;
  }

  .hero-stats {
    justify-content: flex-start;
  }

  .shop-panel,
  .field-card,
  .alert-line {
    margin-left: 18px;
    margin-right: 18px;
  }

  .shop-panel {
    padding: 18px;
  }

  .field-card {
    margin-bottom: 18px;
  }

  .shop-item {
    width: 100%;
  }

  .garden-field {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    min-height: 280px;
  }
}

@media (max-width: 640px) {
  .shop-panel,
  .field-card {
    padding: 16px;
  }

  .shop-plants {
    gap: 12px;
  }

  .garden-field {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    padding: 14px;
  }
}
</style>
