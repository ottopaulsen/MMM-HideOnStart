Module.register("MMM-HideOnStart", {
  defaults: {
    modules: []
  },

  notificationReceived(notification) {
    if (notification === "DOM_OBJECTS_CREATED") {
      this.config.modules.forEach((moduleName) => {
        MM.getModules().enumerate((module) => {
          if (module.name === moduleName) {
            module.hide(0, {});
          }
        });
      });
    }
  }
});

