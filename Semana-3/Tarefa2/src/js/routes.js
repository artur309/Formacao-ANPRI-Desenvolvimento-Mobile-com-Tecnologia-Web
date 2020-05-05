
import HomePage from '../pages/home.f7.html';
import ContatosPage from '../pages/contatos.f7.html';
import DetalhesPage from '../pages/detalhes.f7.html';
import NotFoundPage from '../pages/404.f7.html';
import ListAlunos from './alunos.json';

var routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/contatos/',
    async: function (routeTo, routeFrom, resolve, reject) {
      // Router instance
      var router = this;

      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // User ID from request
      //var userId = routeTo.params.userId;

      // Simulate Ajax Request

      var listaContatos = ListAlunos;
      // Hide Preloader
      app.preloader.hide();

      // Resolve route to load page
      resolve(
        {
          component: ContatosPage
        },
        {
          context: {
            listaContactos: listaContatos
          }
        }
      );
    }
  },
  {
    path: '/',
    component: ListAlunos,
  },
  {
    path: '/contatos/detalhes',
    component: DetalhesPage,
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;