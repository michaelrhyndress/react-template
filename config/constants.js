// Paths
const PAGES = {
	'index.html': 'index.template.ejs'
};

const PATH = require('path');
const ROOT = PATH.resolve(__dirname, '..');
const PATHS = {
	dist: PATH.join(ROOT, 'dist'),
	static: PATH.join(ROOT, 'static'),
	script: PATH.join(ROOT, 'static', 'js'),
	page: PATH.join(ROOT, 'static', 'js', 'pages'),
	component: PATH.join(ROOT, 'static', 'js', 'components'),
	style: PATH.join(ROOT, 'static', 'styles'),
	template: PATH.join(ROOT, 'static', 'templates'),
	img: PATH.join(ROOT, 'static', 'images'),
	file: PATH.join(ROOT, 'static', 'files'),
	config: PATH.join(ROOT, 'config'),
};

exports.PAGES = PAGES;
exports.PATH = PATH;
exports.ROOT = ROOT;
exports.PATHS = PATHS;