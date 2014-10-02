/**
 * main.js in admin
 */

exports.main = function (req, resp) {
	console.log('main() in admin');
	resp.render('main', { title: 'Town-Meeting Admin Page' });
};