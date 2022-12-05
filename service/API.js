import axios from "axios";
// import AuthContext from "./auth";

// const urlGet = "http://springbootmysqlcrudaws-env.eba-tuc39iyz.us-east-1.elasticbeanstalk.com/usuario/";

export function getUser() {
  return axios.get("http://springbootmysqlcrudaws-env.eba-tuc39iyz.us-east-1.elasticbeanstalk.com/usuario/" + 1);
}

export function getUsers() {
  return axios.get("http://springbootmysqlcrudaws-env.eba-tuc39iyz.us-east-1.elasticbeanstalk.com/usuario/all");
}

export function addUser(nome, email, senha) {
  return axios.post("http://springbootmysqlcrudaws-env.eba-tuc39iyz.us-east-1.elasticbeanstalk.com/usuario/add", {
    nome: nome,
    email: email,
    senha: senha,
  });
}

export function delUser(id) {
  return axios.delete(
    "http://springbootmysqlcrudaws-env.eba-tuc39iyz.us-east-1.elasticbeanstalk.com/usuario/" + id
  );
}

export function putUser(id, nome, email, senha) {
  return axios.put(
    "http://springbootmysqlcrudaws-env.eba-tuc39iyz.us-east-1.elasticbeanstalk.com/usuario/" + id,
    {
      nome: nome,
      email: email,
      senha: senha,
    }
  );
}

export function getLivro(id) {
  return axios.get("http://springbootmysqlcrudaws-env.eba-tuc39iyz.us-east-1.elasticbeanstalk.com/livro/" + id);
}

export function addLivro(
  capa,
  titulo,
  subTitulo,
  generoPrincipal,
  generoSecundario,
  sinopse,
  paginasTotais,
  authenticated
) {
  return axios.post("http://springbootmysqlcrudaws-env.eba-tuc39iyz.us-east-1.elasticbeanstalk.com/livro/add", {
    capa: capa,
    titulo: titulo,
    subTitulo: subTitulo,
    generoPrincipal: generoPrincipal,
    generoSecundario: generoSecundario,
    sinopse: sinopse,
    paginasLidas: 0,
    paginasTotais: paginasTotais,
    completo: false,
    usuario: { id: 1 },
  });
}

export function delLivro(id) {
  return axios.delete(
    "http://springbootmysqlcrudaws-env.eba-tuc39iyz.us-east-1.elasticbeanstalk.com/livro/" + id
  );
}

export function putLivro(
  id,
  capa,
  titulo,
  subTitulo,
  generoPrincipal,
  generoSecundario,
  sinopse,
  paginasLidas,
  paginasTotais,
  rating,
  completo,
  authenticated
) {
  return axios.put("http://springbootmysqlcrudaws-env.eba-tuc39iyz.us-east-1.elasticbeanstalk.com/livro/" + id, {
    capa: capa,
    titulo: titulo,
    subTitulo: subTitulo,
    generoPrincipal: generoPrincipal,
    generoSecundario: generoSecundario,
    sinopse: sinopse,
    paginasLidas: paginasLidas,
    paginasTotais: paginasTotais,
    rating: rating,
    completo: completo,
    usuario: { id: authenticated },
  });
}
