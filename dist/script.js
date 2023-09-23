define(['jquery', './widget.js?v=' + Date.now()], function ($, Widget) {
  return function () {
    const self = this;
    const { isProduction } = Widget.default;

    function initStyle(settings, fileName) {
      const file = $(
        `link[href="${settings.path}/${fileName}.css?v=${settings.version}"`
      );

      if (file.length < 1) {
        $('head').append(`
          <link 
            href="${settings.path}/${fileName}.css?v=${settings.version}"
            type="text/css"
            rel="stylesheet"
          >
        `);
      }
    }

    this.callbacks = {
      render: () => {
        const settings = self.get_settings();
        const w_code = settings.widget_code;

        isProduction && initStyle(settings, 'bundle');

        Widget.default.render(self);

        return true;
      },
      init: () => {
        return true;
      },
      bind_actions: () => {
        return true;
      },
      settings: () => {
        Widget.default.settings(self);

        return true;
      },
      onSave: () => {
        return true;
      },
      destroy: () => {
        return true;
      },
    };

    return this;
  };
});
