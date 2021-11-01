import { date } from 'quasar'
const filters =  {
    methods: {
      formatDateTime(dt) {
        return date.formatDate(dt, 'MM/DD/YYYY hh:mm A')
      },
      formatStatus(str){
          const _str = str.toLowerCase();
          return _str == 'active' ? `<span style="font-weight: bold; color: green">${this.capitalize(_str)}</span>` : `<span style="color: red">${this.capitalize(_str)}</span>`;      
      },
      capitalize(str){
        return str && str[0].toUpperCase() + str.slice(1);
      }
    }
  }

  export { filters };