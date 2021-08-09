const accurateInterval = function (fn, time) {
  let cancel, nextAt, timeOut, wrapper;
  nextAt = new Date().getTime() + time;
  timeOut = null;
  wrapper = function () {
    nextAt += time;
    timeOut = setTimeout(wrapper, nextAt - new Date().getTime());
    return fn();
  };
  cancel = function () {
    return clearTimeout(timeOut);
  };
  timeOut = setTimeout(wrapper, nextAt - new Date().getTime());
  return {
    cancel: cancel,
  };
};

export default accurateInterval;
