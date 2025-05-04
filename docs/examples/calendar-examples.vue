<template>
  <button onclick="navigateMonth(-1)">上个月</button>
  <button onclick="navigateToday()">本月</button>
  <button onclick="navigateMonth(1)">下个月</button>

  <table>
    <thead>
      <tr>
        <th v-for="week in weeks" :key="week">{{ week }}</th>
      </tr>
    </thead>
    <tbody id="calendar-grid">
      <tr v-for="weeks in days">
        <td v-for="{ day, type } in weeks" :class="type">
          {{ day }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { computed, ref } from 'vue'
// 星期
const weeks = ['一', '二', '三', '四', '五', '六', '日']
// 月份
const calendarOptions = ref()

const calendarDate = new Date()
const todayDate = new Date().setHours(0, 0, 0, 0)

const generateCalendar = (date) => {
  const year = date.getFullYear()
  const month = date.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startDay = (firstDay.getDay() || 7) - 1 // 周一到周日 (0-6 => 0-6)
  const daysInMonth = lastDay.getDate()

  return {
    year,
    month: month + 1,
    days: [
      // 上月
      ...Array.from({ length: startDay }, (_, i) => ({
        day: new Date(year, month, -startDay + i + 1).getDate(),
        type: 'prev-month',
      })),
      // 本月
      ...Array.from({ length: daysInMonth }, (_, i) => ({
        day: i + 1,
        type:
          new Date(year, month, i + 1).setHours(0, 0, 0, 0) === todayDate
            ? 'highlight-today'
            : 'current-month',
      })),
      // 下月
      ...Array.from({ length: 42 - startDay - daysInMonth }, (_, i) => ({
        day: i + 1,
        type: 'next-month',
      })),
    ],
  }
}

calendarOptions.value = generateCalendar(calendarDate)

const days = computed(() => {
  return calendarOptions.value.days.reduce((acc, cur, index) => {
    if (index % 7 === 0) {
      acc.push([cur])
    } else {
      acc[acc.length - 1].push(cur)
    }
    return acc
  }, [])
})
</script>

<style scoped>
.prev-month,
.next-month {
  color: #ccc;
}

.current-month {
  color: #000;
}

.highlight-today {
  color: red;
  background: #ccc;
}

.chinese-calendar {
  font-size: 12px;
}

#calendar-grid td {
  text-align: center;
  width: 50px;
  height: 50px;
  cursor: pointer;

  &:hover {
    transition: all 0.3s;
    background-color: #cccccc35;
  }
}
</style>
