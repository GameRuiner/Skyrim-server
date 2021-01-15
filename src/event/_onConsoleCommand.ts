declare var mp: any;

export const init = () => {
	mp.makeEventSource(
		'_onConsoleCommand',
		`
    ctx.sp.storage._api_onConsoleCommand = {
      callback(...args) {
        ctx.sendEvent(...args);
      }
    };
  `
	);
};
