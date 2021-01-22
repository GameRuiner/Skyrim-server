const prepend = require('prepend');

prepend('gamemode.js', 'var parcelRequire;', function (error) {
	if (error) console.error(error.message);
});
