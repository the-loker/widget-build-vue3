import { createApp } from 'vue';
import Settings from './components/Settings.vue';

export default function() {
  const self = this;

  this.callbacks = {
    render: () => {
      const settings = self.get_settings();
      const w_code = settings.widget_code;

      return true;
    },
    init: () => {
      return true;
    },
    bind_actions: () => {
      return true;
    },
    settings: async () => {
      const settings = self.get_settings();
      const w_code = settings.widget_code;

      document.getElementById('widget_settings__fields_wrapper').insertAdjacentHTML('beforebegin', '<div id="vue-app"></div>');

      createApp(Settings).mount('#vue-app');

      return true;
    },
    onSave: () => {
      return true;
    },
    destroy: () => {
      return true;
    },
  }

  return this;
}