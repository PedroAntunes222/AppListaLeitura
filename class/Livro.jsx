export default class Livro {
    constructor(id, capa, titulo, subtitulo, sinopse, generoPrincipal, generoSecundario, paginasLidas, paginasTotais, rating, completo) {
      this.id = id;
      this.capa = capa;
      this.titulo = titulo;
      this.subtitulo = subtitulo;
      this.sinopse = sinopse;
      this.generoPrincipal = generoPrincipal;
      this.generoSecundario = generoSecundario;
      this.paginasLidas = paginasLidas;
      this.paginasTotais = paginasTotais;
      this.rating = rating;
      this.completo = completo;
    }
  
    static fromMap(item) {
      return new Magia(
        item.id,
        item.capa,
        item.titulo,
        item.subtitulo,
        item.sinopse,
        item.generoPrincipal,
        item.generoSecundario,
        item.paginasLidas,
        item.paginasTotais,
        item.rating,
        item.completo,
      );
    }
  
    toMap() {
      return {
        capa: this.capa,
        titulo: this.titulo,
        subtitulo: this.subtitulo,
        sinopse: this.sinopse,
        generoPrincipal: this.generoPrincipal,
        generoSecundario: this.generoSecundario,
        paginasLidas: this.paginasLidas,
        paginasTotais: this.paginasTotais,
        rating: this.rating,
        completo: this.completo,
      };
    }
  }