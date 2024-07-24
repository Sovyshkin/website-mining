<script>
export default {
  name: "AppAccruals",
  components: {},
  data() {
    return {
      cards: [
        {
          name: "Пополнение",
          date: "21/11/2024",
          summ: "94.00",
        },
        {
          name: "Пополнение",
          date: "21/11/2024",
          summ: "94.00",
        },
        {
          name: "Списание",
          date: "21/11/2024",
          summ: "94.00",
        },
      ],
    };
  },
  methods: {
    async load_info() {},
  },
  mounted() {
    document.body.style.overflow = "auto";
  },
};
</script>
<template>
  <div class="wrapper">
    <h2>Начисления и списания</h2>
    <div class="cards" v-if="this.cards.length > 0">
      <div class="card" v-for="card in cards" :key="card.id">
        <div class="info">
          <span class="name">{{ card.name }}</span>
          <span class="date">{{ card.date }}</span>
        </div>
        <div class="summ_info">
          <span class="summ plus" v-if="card.name == 'Пополнение'"
            >+{{ card.summ }}$</span
          >
          <span class="summ minus" v-if="card.name != 'Пополнение'"
            >-{{ card.summ }}$</span
          >
          <img src="" alt="" />
        </div>
      </div>
    </div>
    <div class="not_found" v-else>
      <span>Ничего</span>
    </div>
  </div>
</template>
<style scoped>
.wrapper {
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-x: hidden;
  overflow-y: scroll;
}
.cards {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.card {
  width: 100%;
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 30px;
  cursor: auto;
}

.card:hover {
  transform: none;
  box-shadow: none;
}

.btn {
  width: 100%;
  border-radius: 10px;
  padding: 12px 17px;
  color: #fff;
  background-color: #cf0032;
}

.not_found {
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  opacity: 40%;
}

.not_found span {
  font-weight: 400;
  font-size: 20px;
  line-height: 20px;
  color: #272727;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.name {
  font-weight: 600;
  font-size: 16px;
  line-height: 16px;
  color: #272727;
}

.date {
  font-weight: 500;
  font-size: 14px;
  line-height: 14px;
  color: #272727;
  opacity: 40%;
}

.summ_info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.summ {
  font-weight: 600;
  font-size: 18px;
  line-height: 18px;
}

.minus {
  color: #ff104a;
}

.plus {
  color: #3ccc0a;
}

@media (max-width: 400px) {
  .card {
    padding: 15px;
  }
}
</style>
