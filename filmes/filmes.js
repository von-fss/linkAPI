class Filme {
  constructor(nome, diretor, lancamento) {
      this.nome = nome
      this.diretor = diretor
      this.lancamento = lancamento
  }
}

function getAll() {
  return filmes;
}

function getOne(index) {
  return filmes[index];
}

function create(nome, diretor, lancamento) {
  filmes.push(
      new Filme(nome, diretor, lancamento)
  )
}

function update(nome, diretor, lancamento, indexUpdate) {
  let filmeObject = new Filme(nome, diretor, lancamento);
  filmes = filmes.map((filme, index) => {
      if (index === indexUpdate) {
          return filmeObject;
      }
      return filme;
  })
}

// Não podemos chamar apenas de 'delete', pois é uma palavra reservada
function deleteFilme(indexDelete) {
  filmes.splice(indexDelete, 1)
}

module.exports.getAll = getAll;
module.exports.getOne = getOne;
module.exports.create = create;
module.exports.update = update;
module.exports.delete = deleteFilme;