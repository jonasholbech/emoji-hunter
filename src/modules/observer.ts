interface Observer {
  subscribe: (ev: string, callback: (...args: any[]) => void) => void;
  publish: (ev: string, ...args: any[]) => void;
  unsubscribe: (ev: string, callback: (...args: any[]) => void) => void;
}
export const observer: Observer = (function () {
  "use strict";
  //TODO: any
  const events: any = {};
  return {
    subscribe: function (ev, callback) {
      if (!events.hasOwnProperty(ev)) {
        events[ev] = [];
      }
      events[ev].push(callback);
    },
    publish: function (ev) {
      //console.log("Broadcasting: ", ev);
      let data = Array.prototype.slice.call(arguments, 1);
      let index = 0;
      let length = 0;
      if (events.hasOwnProperty(ev)) {
        length = events[ev].length;
        for (; index < length; index++) {
          events[ev][index].apply(this, data);
        }
      }
    },
    unsubscribe: function (ev, callback) {
      let x = events[ev].indexOf(callback);
      events[ev].splice(x, 1);
    },
  };
})();
