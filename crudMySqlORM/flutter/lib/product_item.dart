import 'package:untitled/models/product_model.dart';
import 'package:flutter/material.dart';

class ProductItem extends StatelessWidget {
  const ProductItem({Key? key, this.model, this.onDelete}) : super(key: key);

  final ProductModel? model;
  final Function? onDelete;
  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 0,
      margin: const EdgeInsets.symmetric(horizontal: 10.0, vertical: 5.0),
      child: Container(
        width: 200,
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(50),
        ),
        child: pessoaWidget(context),
      )
    );
  }

  // Widget de cada pessoa na página inicial
  Widget pessoaWidget(context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.start,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
          // Container com a imagem da pessoa
          width: 120,
          alignment: Alignment.center,
          margin: const EdgeInsets.all(10),
          child: Image.network(
              (model!.imagemPessoa == null || model!.imagemPessoa == "")
              ? "https://pwco.com.sg/wp-content/uploads/2020/05/Generic-Profile-Placeholder-v3-1536x1536.png"
              : model!.imagemPessoa!,
              height: 70,
              fit: BoxFit.scaleDown,
          ),
        ),
        Padding(
          padding: const EdgeInsets.all(8.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Informações da Pessoa que aparecerá na tela
              Text(
                "Nome: ${model!.nome}",
                style: const TextStyle(
                  color: Colors.black,
                  fontWeight: FontWeight.bold
                ),
              ),
              Text(
                "CPF: ${model!.cpf}",
                style: TextStyle(
                  color: Colors.black,
                )
              ),
              const SizedBox(
                // Tamanho da caixa com as informações do container
                height: 10,
              ),
              Container(
                width: MediaQuery.of(context).size.width - 180,
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: [
                    GestureDetector(
                      // Criando um botão de editar pessoa, no container da mesma
                      child: const Icon(Icons.edit),
                      onTap: () {},
                    ),
                    GestureDetector(
                      // Criando um botão de deletar pessoa, no container da mesma
                      child: const Icon(Icons.delete, color: Colors.red),
                      onTap: () {
                        onDelete!(model);
                      },
                    ),
                  ]
                )
              )
            ],
          )
        )
      ]
    );
  }
}
