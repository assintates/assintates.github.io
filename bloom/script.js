new Vue({
  el: "#app",
  vuetify: new Vuetify({
  theme: { dark: true },
}),
  data: () => ({
    updating: true,
    timer: null,
    indexing: false,
    messages: [
    {
      from: "You",
      message: ` Waiting for Server Push.`,
      time: "10:42am",
      color: "deep-purple lighten-1" }] }),




  mounted: function () {
    this.timer = setInterval(() => {
      this.greet();
    }, 8000);
  },

  beforeDestroy() {
    clearInterval(this.timer);
  },

  methods: {
    greet(event) {
      if (this.updating !== true) return;
      axios.
      get("https://meili-router-y3nzkqh739iaz4yh-gtw.qovery.io/stats").
      then(response => {
        console.log(response.data);

        if (this.messages.length > 1) {
          this.messages.shift();
        };
        this.indexing = response.data.indexes.hina.isIndexing;
        this.messages.push({
          from: this.bytesToSize(response.data.databaseSize),
          message: response.data.indexes.hina.numberOfDocuments,
          time: this.formatDate(response.data.lastUpdate),
          color: "green" });

      });
    },
    bytesToSize(bytes) {
      var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
      if (bytes == 0) return "0 Byte";
      var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
      return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
    },
    formatDate(time) {
      let m = Date(time);
      return m;
    } } });
