<script>
import axios from "axios";
import ChartLine from "./ChartLine.vue";
import LoadingSpinner from "./LoadingSpinner.vue";

export default {
  name: "AppDashboard",
  components: { ChartLine, LoadingSpinner },
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
      online_count: 0,
      offline_count: 0,
      total_hash_rate: 0,
      total_energy_consumption: 0,
      expected_income: 0,
      expected_profit: 0,
      expected_hosting: 0,
      electricity_cost: 0,
      isLoading: true,
    };
  },
  methods: {
    async load_info() {
      try {
        this.isLoading = true;
        let resBalance = await axios.get(`/miners/balance`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        // console.log(resBalance);
        this.value_usd = resBalance.data.value_usd || 0;
        this.btc = resBalance.data.value || 0;
        let resWorkers = await axios.get(`/miners/information`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        // console.log(resWorkers);
        this.online_count = resWorkers.data.online_count;
        this.offline_count = resWorkers.data.offline_count;
        this.total_hash_rate = resWorkers.data.total_hash_rate;
        this.total_energy_consumption =
          resWorkers.data.total_energy_consumption;
        this.expected_income = resWorkers.data.expected_income || 0;
        this.expected_profit = resWorkers.data.expected_profit || 0;
        this.expected_hosting = resWorkers.data.expected_hosting || 0;
        this.electricity_cost = resWorkers.data.electricity_cost || 0;
        let response = await axios.get(`/miners/dashboards`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(response);
        this.dashboards = response.data;
        this.income = response.data.income;
        this.chartData.labels = Object.keys(this.income);
        this.chartData.datasets[0].data = Object.values(this.income);
        this.income_show = true;
        this.hostingData.labels = Object.keys(response.data.hosting);
        this.hostingData.datasets[0].data = Object.values(
          response.data.hosting
        );
        this.hosting_show = true;
        this.hashrateData.labels = Object.keys(response.data.hash_rate);
        this.hashrateData.datasets[0].data = Object.values(
          response.data.hash_rate
        );
        this.hashrate_show = true;
      } catch (err) {
        console.log(err);
      } finally {
        this.isLoading = false;
      }
    },
    roundTwo(n) {
      if (n) {
        return Math.round(n * 100) / 100;
      }
      return n;
    },
  },
  mounted() {
    this.load_info();
  },
};
</script>
<template>
  <LoadingSpinner v-if="isLoading" />
  <div class="wrapper" v-else>
    <h2>{{ $t("dash") }}</h2>
    <div class="balance bx">
      <div class="info">
        <span class="name">{{ $t("balance") }}</span>
        <div class="group">
          <span class="usd">{{ value_usd }} $</span>
          <span class="btc">(~{{ btc }} BTC)</span>
        </div>
      </div>
      <div class="wrap_btns">
        <button class="btn">{{ $t("deposit") }}</button>
        <button class="btn withdraw">{{ $t("withdraw") }}</button>
      </div>
    </div>
    <div class="wrap-cards">
      <div class="card">
        <div class="title status">
          <div class="online"></div>
          Online
        </div>
        <div class="value">{{ online_count }}</div>
      </div>
      <div class="card">
        <div class="title status">
          <div class="offline"></div>
          Offline
        </div>
        <div class="value">{{ offline_count }}</div>
      </div>
      <div class="card">
        <div class="title hashrate">Th/s</div>
        <div class="value">{{ total_hash_rate }}</div>
      </div>
      <div class="card">
        <div class="title electricity">KW</div>
        <div class="value">{{ total_energy_consumption }}</div>
      </div>
      <div class="card">
        <div class="title">{{ $t("expectedProfit") }}</div>
        <div class="value profit">
          <div class="day">
            <span class="value">{{ expected_profit }}</span>
            <span class="usd-day">USD/{{ $t("dayOne") }}</span>
          </div>
          <div class="month">
            <span class="value">{{ roundTwo(expected_profit * 31) }}</span>
            <span class="usd-month">USD/{{ $t("monthOne") }}</span>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="title">{{ $t("expectedIncome") }}</div>
        <div class="value profit">
          <div class="day">
            <span class="value">{{ expected_income }}</span>
            <span class="usd-day">USD/{{ $t("dayOne") }}</span>
          </div>
          <div class="month">
            <span class="value">{{ roundTwo(expected_income * 31) }}</span>
            <span class="usd-month">USD/{{ $t("monthOne") }}</span>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="title">{{ $t("hosting") }}</div>
        <div class="value profit">
          <div class="day">
            <span class="value">{{ expected_hosting }}</span>
            <span class="usd-day">USD/{{ $t("dayOne") }}</span>
          </div>
          <div class="month">
            <span class="value">{{ roundTwo(expected_hosting * 31) }}</span>
            <span class="usd-month">USD/{{ $t("monthOne") }}</span>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="title">{{ $t("electricity") }}</div>
        <div class="value profit">
          <div class="day">
            <span class="value">{{ electricity_cost }} $</span>
            <span class="usd-day">per KW</span>
          </div>
        </div>
      </div>
    </div>
    <ChartLine v-if="income_show" :chartData="chartData" :name="$t('dohod')" />

    <ChartLine
      v-if="hosting_show"
      :chartData="hostingData"
      :name="$t('costHosting')"
    />

    <ChartLine
      v-if="hashrate_show"
      :chartData="hashrateData"
      :name="$t('hash')"
    />
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

.wrap-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.card {
  flex: 20%;
  padding: 25px 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 20px;
  border: none;
  cursor: auto;
}

.card:hover {
  transform: none;
}

.title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 17px;
  line-height: 17px;
}

.online,
.offline {
  width: 8px;
  height: 8px;
  border-radius: 13px;
}

.online {
  background-color: #45ed0b;
}

.offline {
  background-color: #ff104a;
}

.status {
  font-weight: 600;
  font-size: 14px;
  line-height: 14px;
}

.value {
  font-weight: 600;
  font-size: 20px;
  line-height: 20px;
}

.hashrate,
.electricity {
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
}

.usd-day,
.usd-month {
  opacity: 50%;
  font-weight: 500;
  font-size: 14px;
  line-height: 14px;
}

.day,
.month {
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
}

.profit {
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: space-between;
}

@media (max-width: 1200px) {
  .card {
    flex: 25%;
    padding: 20px;
  }
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

@media (max-width: 575px) {
  .card {
    flex: 45%;
    padding: 15px;
  }
}

@media (max-width: 420px) {
  .card {
    flex: 100%;
    padding: 20px;
  }
}
</style>
