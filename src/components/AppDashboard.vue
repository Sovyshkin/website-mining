<script>
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "vue-chartjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
);

export default {
  name: "AppDashboard",
  components: { Line },
  data() {
    return {
      chartData: {
        labels: [],
        datasets: [
          {
            backgroundColor: "#00CF91",
            borderColor: "#00CF91",
            pointRadius: 2,
            data: [],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
      dashboards: [],
      income: [],
      income_show: false,
      hosting_show: false,
      hostingData: {
        labels: [],
        datasets: [
          {
            backgroundColor: "#CF0032BA",
            borderColor: "#CF0032BA",
            pointRadius: 2,
            fill: "#CF0032BA",
            data: [],
          },
        ],
      },
      hashrate_show: false,
      hashrateData: {
        labels: [],
        datasets: [
          {
            backgroundColor: "#0084CF",
            borderColor: "#0084CF",
            pointRadius: 2,
            data: [],
          },
        ],
      },
      value_usd: 0,
      btc: 0,
    };
  },
  methods: {
    async load_info() {
      try {
        let resp = await axios.get(`/miners/balance`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        this.value_usd = resp.data.value_usd || 0;
        this.btc = resp.data.value || 0;
        let response = await axios.get(`/miners/dashboards`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(response);
        this.dashboards = response.data.dashboards;
        this.income = this.dashboards.income;
        this.chartData.labels = Object.keys(this.income);
        this.chartData.datasets[0].data = Object.values(this.income);
        this.income_show = true;
        this.hostingData.labels = Object.keys(response.data.dashboards.hosting);
        this.hostingData.datasets[0].data = Object.values(
          response.data.dashboards.hosting
        );
        this.hosting_show = true;
        this.hashrateData.labels = Object.keys(
          response.data.dashboards.hash_rate
        );
        this.hashrateData.datasets[0].data = Object.values(
          response.data.dashboards.hash_rate
        );
        this.hashrate_show = true;
      } catch (err) {
        console.log(err);
      }
    },
  },
  mounted() {
    this.load_info();
  },
};
</script>
<template>
  <div class="wrapper">
    <h2>Приборная панель</h2>
    <div class="balance">
      <div class="info">
        <span class="name">Баланс</span>
        <div class="group">
          <span class="usd">{{ value_usd }} $</span>
          <span class="btc">(~{{ btc }} BTC)</span>
        </div>
      </div>
      <div class="wrap_btns">
        <button class="btn">Пополнить</button>
        <button class="btn withdraw">Вывести</button>
      </div>
    </div>
    <div class="wrap-chart">
      <h2>Доход</h2>
      <Line
        v-if="income_show"
        class="line"
        :data="chartData"
        :options="options"
        ref="chart"
      />
    </div>

    <div class="wrap-chart">
      <h2>Cтоимость хостинга</h2>
      <Line
        v-if="hosting_show"
        class="line"
        :data="hostingData"
        :options="options"
      />
    </div>

    <div class="wrap-chart">
      <h2>Хешрейт</h2>
      <Line
        v-if="hashrate_show"
        class="line"
        :data="hashrateData"
        :options="options"
      />
    </div>
  </div>
</template>
<style scoped>
.wrapper {
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  overflow-x: hidden;
  overflow-y: scroll;
}

.balance {
  width: 100%;
  padding: 25px 30px;
  display: flex;
  gap: 20px;
  border-radius: 20px;
  background-color: #fff;
  align-items: center;
  justify-content: space-between;
}

.name {
  font-weight: 500;
  opacity: 50%;
  font-size: 16px;
  line-height: 16px;
  color: #272727;
}

.group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.usd {
  font-weight: 600;
  color: #272727;
  font-size: 24px;
  line-height: 24px;
}
.btc {
  font-weight: 500;
  font-size: 20px;
  line-height: 20px;
  color: #272727;
  opacity: 50%;
}

.wrap_btns {
  display: flex;
  align-items: center;
  gap: 10px;
}

.btn {
  background-color: #cf0032;
  border: none;
  border-radius: 10px;
  padding: 17px 32px;
  font-weight: 600;
  font-size: 16px;
  line-height: 16px;
  color: #fff;
}

.withdraw {
  color: #cf0032;
  border: 1px solid #cf0032;
  background-color: transparent;
}

.line {
  max-height: 400px;
}

.wrap-chart {
  background-color: #fff;
  border-radius: 20px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

@media (max-width: 940px) {
  .balance {
    flex-direction: column;
    align-items: start;
  }

  .wrap_btns {
    width: 100%;
  }

  .wrap_btns button {
    width: 50%;
  }
}

@media (max-width: 768px) {
  .wrap_btns {
    flex-direction: column;
  }

  .wrap_btns button {
    width: 100%;
  }
}
</style>
