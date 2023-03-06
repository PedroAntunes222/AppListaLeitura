// import SQLite from "react-native-sqlite-storage";
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('biblioteca.db');
import Livro from '../class/Livro'

export const initDB = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Livros( 
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, 
        capa TEXT, 
        titulo TEXT, 
        subtitulo TEXT, 
        sinopse TEXT, 
        generoPrincipal TEXT, 
        generoSecundario TEXT, 
        paginasLidas INTEGER, 
        paginasTotais INTEGER, 
        rating INTEGER, 
        completo TEXT 
        )`
    );
  });
};

export const addLivro = (livro) => {
  db.transaction(tx => {
          tx.executeSql('INSERT INTO Livros(capa, titulo, subtitulo, sinopse, generoPrincipal, generoSecundario, paginasLidas, paginasTotais, rating, completo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [livro.capa, livro.titulo, livro.subtitulo, livro.sinopse, livro.generoPrincipal, livro.generoSecundario, livro.paginasLidas, livro.paginasTotais, livro.rating, livro.completo],
      (txObj, resultSet) => {
        console.log(resultSet)
      },
      (txObj, error) => console.log(error)
    );
  })
}

export const getLivros = (callback) => {
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM Livros', null,
      (txObj, resultSet) => callback(resultSet.rows._array),
      (txObj, error) => console.log(error)
    );
  });
};

export const getLivro = (id, callback) => {
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM Livros WHERE id=?', [id],
      (txObj, resultSet) => callback(resultSet.rows._array),
      (txObj, error) => console.log(error)
    );
  });
};

export const putLivro = (livro) => {
  db.transaction(tx => {
    tx.executeSql('UPDATE Livros SET capa=?, titulo=?, subtitulo=?, sinopse=?, generoPrincipal=?, generoSecundario=?, paginasLidas=?, paginasTotais=?, rating=?, completo=? WHERE id=?', [livro.capa, livro.titulo, livro.subtitulo, livro.sinopse, livro.generoPrincipal, livro.generoSecundario, livro.paginasLidas, livro.paginasTotais, livro.rating, livro.completo, livro.id],
      (txObj, resultSet) => {
        console.log(resultSet)
      },
      (txObj, error) => console.log(error)
    );
  });
};

export const delLivro = (id) => {
  db.transaction(tx => {
    tx.executeSql('DELETE FROM Livros WHERE id=?', [id],
      (txObj, resultSet) => {
        console.log(resultSet)
      },
      (txObj, error) => console.log(error)
    );
  });
};