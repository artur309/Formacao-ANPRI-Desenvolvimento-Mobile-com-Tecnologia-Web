import $$ from 'dom7';
import Framework7 from './framework7-custom.js';

// Import F7 Styles
import '../css/framework7-custom.less';

// Import Icons and App Custom Styles
import '../css/icons.css';
import '../css/app.less';
import '../css/styles.css';
// Import Cordova APIs
import cordovaApp from './cordova-app.js';

// Import JQuery APIs
import JQueryApp from './jquery-3.5.1.min.js';

// Import Routes
import routes from './routes.js';

// Import main app component
import App from '../app.f7.html';

var app = new Framework7({
	root: '#app', // App root element
	component: App, // App main component
	id: 'io.framework7.myapp', // App bundle ID
	name: 'Firebase', // App name
	theme: 'auto', // Automatic theme detection

	// App routes
	routes: routes,

	// Register service worker
	serviceWorker: Framework7.device.cordova ? {} : {
		path: '/service-worker.js',
	},
	// Input settings
	input: {
		scrollIntoViewOnFocus: Framework7.device.cordova && !Framework7.device.electron,
		scrollIntoViewCentered: Framework7.device.cordova && !Framework7.device.electron,
	},
	// Cordova Statusbar settings
	statusbar: {
		iosOverlaysWebView: true,
		androidOverlaysWebView: false,
	},
	on: {
		init: function () {
			var f7 = this;
			if (f7.device.cordova) {
				// Init cordova APIs (see cordova-app.js)
				cordovaApp.init(f7);
			}
		},
	},
});

$$(document).on("page:afterin", '.page[data-name="contatos"]', function (e) {
  // Child checkbox change
  $$('[name="checkboxAluno"]').on("change", function (e) {
  	var totalChecked = $$('[name="checkboxAluno"]:checked').length;
  	var totalChecks = $$('[name="checkboxAluno"]').length;
  	console.log(totalChecked + "/" + totalChecks);
  	if (totalChecked === 0)
  		$$('[name="checkboxAlunos"]').prop("checked", false);
  	else if (totalChecked === totalChecks)
  		$$('[name="checkboxAlunos"]').prop("checked", true);

  	if (totalChecked > 0 && totalChecked < totalChecks)
  		$$('[name="checkboxAlunos"]').prop("indeterminate", true);
  	else
  		$$('[name="checkboxAlunos"]').prop("indeterminate", false);
  });
  
  // Parent checkbox change
  $$('[name="checkboxAlunos"]').on("change", function (e) {
  	if (e.target.checked)
  		$$('[name="checkboxAluno"]').prop("checked", true);
  	else
  		$$('[name="checkboxAluno"]').prop("checked", false);

  });
});