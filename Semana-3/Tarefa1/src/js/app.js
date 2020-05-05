import $$ from 'dom7';
import Framework7 from './framework7-custom.js';

// Import F7 Styles
import '../css/framework7-custom.less';

// Import Icons and App Custom Styles
import '../css/icons.css';
import '../css/app.less';
// Import Cordova APIs
import cordovaApp from './cordova-app.js';
// Import Routes
import routes from './routes.js';

// Import main app component
import App from '../app.f7.html';

var app = new Framework7({
  root: '#app', // App root element
  component: App, // App main component
  id: 'io.framework7.myapp', // App bundle ID
  name: 'Tarefa1', // App name
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
  navbar: {
    mdCenterTitle: true
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

//evento init da página contatos
$$(document).on('page:init', '.page[data-name="contatos"]', function (e) {
  //verificar que a página foi carregada
  console.log('contatos');
  // Indicar qual o template a utilizar
  var template = $$('#template-aluno').html();
  // Compilar e renderizar o template
  var compiledTemplate = Template7.compile(template);
  // Obter os dados do ficheiro JSON
  app.request.json('alunos.json', function (json) {
    // Verificar que os dados foram lidos
    console.log(json);
    // Inserir os dados no template
    $$('#result-wrap-aluno').html(compiledTemplate(json))
  });
})
