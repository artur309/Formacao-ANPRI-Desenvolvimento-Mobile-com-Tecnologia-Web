import HomePage from "../pages/home.f7.html";
import ContatosPage from "../pages/contatos.f7.html";
import DetalhesPage from "../pages/detalhes.f7.html";
import NotFoundPage from "../pages/404.f7.html";
import * as firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyCggjhVQxvm8AX4tcBq9q5OjHgDejZpRVk",
  authDomain: "anpri-6e5cb.firebaseapp.com",
  databaseURL: "https://anpri-6e5cb.firebaseio.com",
  projectId: "anpri-6e5cb",
  storageBucket: "anpri-6e5cb.appspot.com",
  messagingSenderId: "45602479561",
  appId: "1:45602479561:web:52f97b704dddb9b0081c18",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var routes = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/contatos/",
    master: true,
    async: function (routeTo, routeFrom, resolve, reject) {
      var router = this;
      var app = router.app;

      app.preloader.show();

      var listaContatos;

      firebase
        .database()
        .ref("/alunos/")
        .once("value")
        .then(function (snapshot) {
          //atribuir os dados lidos à variável json já usada anteriormente
          listaContatos = snapshot.val();

          app.preloader.hide();
          // Verificar que os dados foram lidos
          console.log(listaContatos);
          // Inserir os dados no template
          resolve(
            {
              component: ContatosPage,
            },
            {
              context: {
                listaContactos: listaContatos,
              },
            }
          );
        });
    },
  },
  {
    path: "/detalhes/:Num/:Nome/:Mail/:Telemovel/:Morada/:Coordenadas/",
    component: DetalhesPage,
    async: function (routeTo, routeFrom, resolve, reject) {
      var router = this;

      var app = router.app;

      app.preloader.show();

      var listaContatos;

      firebase
        .database()
        .ref("/alunos/")
        .once("value")
        .then(function (snapshot) {
          //atribuir os dados lidos à variável json já usada anteriormente
          listaContatos = snapshot.val();

          app.preloader.hide(); //load

          // Resolve route to load page
          resolve(
            {
              component: contactosPage,
            },
            {
              context: {
                listaContactos: listaContatos,
              },
            }
          );
        });
    },
  },
  {
    path: "(.*)",
    component: NotFoundPage,
  },
];

export default routes;
