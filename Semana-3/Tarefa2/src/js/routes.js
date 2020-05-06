
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
		var router = this;
		var app = router.app;

		app.preloader.show();

		var listaContatos = ListAlunos;
		app.preloader.hide();

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
	path: '/detalhes/:Num/:Nome/:Mail/:Telemovel/:Morada/:Coordenadas/',
	component: DetalhesPage,
	async: function (routeTo, routeFrom, resolve, reject) {
		var router = this;

		var app = router.app;

		app.preloader.show();

		var listaContatos = ListAlunos;
		app.preloader.hide();

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
	path: '(.*)',
	component: NotFoundPage,
},
];

export default routes;