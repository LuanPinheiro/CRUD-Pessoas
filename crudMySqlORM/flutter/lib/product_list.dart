import "package:flutter/material.dart";
import 'package:untitled/models/product_model.dart';
import 'package:untitled/product_item.dart';

// Widget de listagem de todos os produtos
class ProductList extends StatefulWidget {
  const ProductList({Key? key}) : super(key: key);

  @override
  _ProductListState createState() => _ProductListState();
}

class _ProductListState extends State<ProductList> {
  List<ProductModel> products = List<ProductModel>.empty(growable: true);

  @override
  void initState() {
    super.initState();

    products.add(
      ProductModel(
        nome: "Teste",
        cpf: "1234567890",
        imagemPessoa: "https://pwco.com.sg/wp-content/uploads/2020/05/Generic-Profile-Placeholder-v3-1536x1536.png"
      )
    );
    products.add(
        ProductModel(
            nome: "Teste2",
            cpf: "1234567890",
            imagemPessoa: "https://pwco.com.sg/wp-content/uploads/2020/05/Generic-Profile-Placeholder-v3-1536x1536.png"
        )
    );
    // Adicionando 2 objetos teste na lista
  } // Chamada quando o widget é criado pela primeira vez

  // Widget da lista de produtos
  Widget productList(products){
    return SingleChildScrollView(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Column(
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              ElevatedButton(
                // Botão de adicionar pessoa
                style: ElevatedButton.styleFrom(
                  foregroundColor: Colors.white,
                  backgroundColor: Colors.green,
                  minimumSize: const Size(88, 36),
                  padding: const EdgeInsets.symmetric(horizontal: 16),
                  shape: const RoundedRectangleBorder(
                    borderRadius: BorderRadius.all(
                      Radius.circular(10)
                    )
                  ),
                ),
                onPressed: () {
                  Navigator.pushNamed(context, "/add-product");
                },
                child: const Text("Adicionar Pessoa"),
              ),
              ListView.builder(
                shrinkWrap: true,
                physics: const ClampingScrollPhysics(),
                scrollDirection:  Axis.vertical,
                itemCount: products.length,
                itemBuilder: (context, index) {
                  return ProductItem(
                    model: products[index],
                    onDelete: (ProductModel model) {},
                  );
                },
              )
            ]
          )
        ]
      )
    );
  }

  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Lista de Pessoas"),
        elevation: 0
      ),
      backgroundColor: Colors.grey,
      body: productList(products),
    );
  }
}
