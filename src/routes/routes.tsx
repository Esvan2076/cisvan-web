import Movie from "../components/Movie";

const routes = [
  { path: "/", element: <Movie /> },
  { path: "*", element: <Movie /> }, // Ruta por defecto si no se encuentra una página
];

export default routes;
