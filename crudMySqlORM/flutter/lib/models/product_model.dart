List<ProductModel> productsFromJson(dynamic str) =>
    List<ProductModel>.from((str).map((x) => ProductModel.fromJson(x)));

class ProductModel {
  late String? nome;
  late String? idade;
  late String? cpf;
  late bool? estaTrabalhando;
  late String? imagemPessoa;

  ProductModel({
    this.nome,
    this.idade,
    this.cpf,
    this.estaTrabalhando,
    this.imagemPessoa});

  ProductModel.fromJson(Map<String, dynamic> json) {
    nome = json["nome"];
    idade = json["idade"];
    cpf = json["cpf"];
    estaTrabalhando = json["estaTrabalhando"];
    imagemPessoa = json["imagemPessoa"];
  }

  Map<String, dynamic> toJson() {
    final _data = <String, dynamic>{};

    _data['nome'] = nome;
    _data['idade'] = idade;
    _data['cpf'] = cpf;
    _data['estaTrabalhando'] = estaTrabalhando;
    _data['imagemPessoa'] = imagemPessoa;

    return _data;
  }
}
// Variáveis auto_increment são ocultas no programa
// Definindo base do modelo, igual como está no NodeJs e no Banco de Dados