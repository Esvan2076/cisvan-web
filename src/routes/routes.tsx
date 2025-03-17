import Movie from "../components/Movie";

const routes = [
  { path: "/", element: <Movie children={undefined} /> },
  { path: "*", element: <Movie children={undefined}/> }, // Ruta por defecto si no se encuentra una página
];

export default routes;
