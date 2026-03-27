import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'

const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PORT = process.env.PORT || 3005

const DISH_PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 400'%3E%3Crect width='640' height='400' rx='32' fill='%23eef2ff'/%3E%3Ccircle cx='320' cy='152' r='66' fill='%23c7d2fe'/%3E%3Cpath d='M214 268c28-34 71-52 106-52s78 18 106 52' fill='none' stroke='%234f46e5' stroke-width='24' stroke-linecap='round'/%3E%3Ctext x='320' y='340' text-anchor='middle' font-family='Segoe UI, Arial, sans-serif' font-size='28' font-weight='700' fill='%23334155'%3E%D0%91%D0%BB%D1%8E%D0%B4%D0%BE%20%D0%B1%D0%B5%D0%B7%20%D1%84%D0%BE%D1%82%D0%BE%3C/text%3E%3C/svg%3E"

app.use(cors())
app.use(express.json())

/* =========================
   ФЕРМА
========================= */

let user = {
  gold: 2502
}

let shop = [
  {
    id: 0,
    title: 'Картофель',
    image: 'potato',
    buyPrice: 37,
    sellPrice: 45,
    growTime: 2
  },
  {
    id: 1,
    title: 'Клубника',
    image: 'strawberry',
    buyPrice: 18,
    sellPrice: 27,
    growTime: 2
  },
  {
    id: 2,
    title: 'Базилик',
    image: 'basil',
    buyPrice: 8,
    sellPrice: 12,
    growTime: 1
  }
]

let garden = []

function getCurrentTimePlusMinutes(minutes) {
  const now = new Date()
  now.setMinutes(now.getMinutes() + minutes)

  const hours = String(now.getHours()).padStart(2, '0')
  const mins = String(now.getMinutes()).padStart(2, '0')

  return `${hours}:${mins}`
}

function isReadyToHarvest(timeToHarvest) {
  if (!timeToHarvest) return true

  const now = new Date()
  const [hours, minutes] = timeToHarvest.split(':').map(Number)

  const target = new Date()
  target.setHours(hours, minutes, 0, 0)

  return now >= target
}

app.get('/shop', (req, res) => {
  shop = shop.map(item => {
    const delta = Math.floor(Math.random() * 5) - 2
    const newBuy = Math.max(1, item.buyPrice + delta)
    const newSell = Math.max(newBuy + 1, item.sellPrice + delta)

    return {
      ...item,
      buyPrice: newBuy,
      sellPrice: newSell
    }
  })

  res.json(shop)
})

app.get('/user', (req, res) => {
  res.json(user)
})

app.get('/garden', (req, res) => {
  res.json(garden)
})

app.post('/shop/buy', (req, res) => {
  const { id, count } = req.body

  const plant = shop[id]
  const plantCount = Number(count)

  if (!plant || !plantCount || plantCount < 1) {
    return res.status(400).json({ message: 'Некорректные данные покупки' })
  }

  const totalPrice = plant.buyPrice * plantCount

  if (user.gold < totalPrice) {
    return res.status(400).json({ message: 'Недостаточно денег' })
  }

  user.gold -= totalPrice

  for (let i = 0; i < plantCount; i++) {
    garden.push({
      id: Date.now().toString() + Math.random().toString(16).slice(2) + i,
      title: plant.title,
      image: plant.image,
      sellPrice: plant.sellPrice,
      timeToHarvest: getCurrentTimePlusMinutes(plant.growTime)
    })
  }

  res.json({
    success: true,
    gold: user.gold,
    garden
  })
})

app.post('/garden/harvest', (req, res) => {
  const { id } = req.body

  const plantIndex = garden.findIndex(item => item.id === id)

  if (plantIndex === -1) {
    return res.status(404).json({ message: 'Растение не найдено' })
  }

  const plant = garden[plantIndex]

  if (!isReadyToHarvest(plant.timeToHarvest)) {
    return res.json({
      success: false,
      message: 'Растение ещё не созрело'
    })
  }

  user.gold += plant.sellPrice
  garden.splice(plantIndex, 1)

  res.json({
    success: true,
    gold: user.gold
  })
})

/* =========================
   БЛЮДА И ГОТОВКА
========================= */

let dishes = [
  {
    id: 'dish-1',
    title: 'Борщ',
    preparation: 'Свекла, картофель, капуста, мясо. Варить 60 минут.',
    timeToCook: 60,
    image:
      'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'dish-2',
    title: 'Паста Карбонара',
    preparation: 'Отварить пасту, добавить соус, бекон и сыр.',
    timeToCook: 25,
    image:
      'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=800&q=80'
  }
]

let cooking = []

app.get('/dishes', (req, res) => {
  res.json(dishes)
})

app.get('/dish', (req, res) => {
  const { id } = req.query
  const dish = dishes.find(item => item.id === id)

  if (!dish) {
    return res.status(404).json({ message: 'Рецепт не найден' })
  }

  res.json(dish)
})

app.post('/dishes', (req, res) => {
  const { title, preparation, timeToCook, image } = req.body

  if (!title || !preparation || !timeToCook) {
    return res.status(400).json({ message: 'Заполни все поля блюда' })
  }

  const newDish = {
    id: 'dish-' + Date.now().toString(),
    title,
    preparation,
    timeToCook: Number(timeToCook),
    image: image && String(image).trim() ? image : DISH_PLACEHOLDER
  }

  dishes.push(newDish)
  res.json(newDish)
})

app.delete('/dishes/:id', (req, res) => {
  const { id } = req.params
  const dishIndex = dishes.findIndex(item => item.id === id)

  if (dishIndex === -1) {
    return res.status(404).json({ message: 'Блюдо не найдено' })
  }

  dishes.splice(dishIndex, 1)
  cooking = cooking.filter(item => item.id !== id)

  res.json({ success: true })
})

app.post('/cooking/cook', (req, res) => {
  const { id } = req.body

  const dish = dishes.find(item => item.id === id)

  if (!dish) {
    return res.status(404).json({ message: 'Блюдо не найдено' })
  }

  const cookingDish = {
    ...dish,
    preparingTime: 0,
    isCooked: false,
    cookingId: 'cook-' + Date.now().toString() + Math.random().toString(16).slice(2)
  }

  cooking.push(cookingDish)
  res.json(cookingDish)
})

app.delete('/cooking/:id', (req, res) => {
  const { id } = req.params
  const cookingIndex = cooking.findIndex(item => item.cookingId === id)

  if (cookingIndex === -1) {
    return res.status(404).json({ message: 'Блюдо в готовке не найдено' })
  }

  cooking.splice(cookingIndex, 1)
  res.json({ success: true })
})

app.get('/cooking', (req, res) => {
  cooking = cooking.map(item => {
    if (item.isCooked) return item

    const nextPreparingTime = item.preparingTime + 1
    const cooked = nextPreparingTime >= item.timeToCook

    return {
      ...item,
      preparingTime: cooked ? item.timeToCook : nextPreparingTime,
      isCooked: cooked
    }
  })

  res.json(cooking)
})

app.use(express.static(path.join(__dirname, 'dist')))

app.get(/^(?!\/(shop|user|garden|dishes|dish|cooking)).*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`)
})
