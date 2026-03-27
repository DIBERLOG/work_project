<script>
import axios from 'axios'

export default {
  data() {
    return {
      currencies: null,
      error: ''
    }
  },
  methods: {
    async loadCurrencies() {
      try {
        const [usd, eur, gbp] = await Promise.all([
          axios.get('https://api.coinbase.com/v2/prices/BTC-USD/spot'),
          axios.get('https://api.coinbase.com/v2/prices/BTC-EUR/spot'),
          axios.get('https://api.coinbase.com/v2/prices/BTC-GBP/spot')
        ])

        this.currencies = {
          chartName: 'Bitcoin',
          bpi: [
            { code: 'USD', rate: usd.data.data.amount },
            { code: 'EUR', rate: eur.data.data.amount },
            { code: 'GBP', rate: gbp.data.data.amount }
          ]
        }
      } catch (error) {
        this.error = 'Не удалось загрузить курс'
        console.log(error)
      }
    }
  },
  mounted() {
    this.loadCurrencies()
  }
}
</script>

<template>
  <div class="container-box">
    <div v-if="currencies" class="rates-card">
      <div class="rates-head">
        <p class="eyebrow">Live Market</p>
        <h3>Курс {{ currencies.chartName }}</h3>
      </div>

      <div class="rates-grid">
        <div class="rate-item" v-for="currency in currencies.bpi" :key="currency.code">
          <span>{{ currency.code }}</span>
          <strong>{{ currency.rate }}</strong>
        </div>
      </div>
    </div>

    <p v-else-if="error" class="state-text error">{{ error }}</p>
    <p v-else class="state-text">Загрузка курса...</p>
  </div>
</template>

<style scoped>
.container-box {
  max-width: 760px;
}

.rates-card {
  padding: 22px;
  border-radius: var(--radius);
  border: 1px solid var(--line);
  background: #fff;
  box-shadow: var(--shadow-sm);
}

.rates-head h3 {
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

.rates-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin-top: 18px;
}

.rate-item {
  padding: 18px;
  border-radius: 14px;
  background: var(--card-muted);
  border: 1px solid var(--line);
}

.rate-item span {
  display: block;
  color: #64748b;
  font-weight: 700;
  margin-bottom: 8px;
}

.rate-item strong {
  font-size: 22px;
}

.state-text {
  margin: 0;
  padding: 18px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.8);
}

.state-text.error {
  color: #b91c1c;
}

@media (max-width: 720px) {
  .rates-grid {
    grid-template-columns: 1fr;
  }
}
</style>
