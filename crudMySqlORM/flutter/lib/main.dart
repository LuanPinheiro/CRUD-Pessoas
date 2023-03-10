import 'package:flutter/material.dart';
import 'package:untitled/product_add_edit.dart';
import 'package:untitled/product_list.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);


  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Node CRUD',
      theme: ThemeData(
        primarySwatch: Colors.pink,
      ),
      routes: {
        '/': (context) => const ProductList(), // Página Inicial
        '/add-product': (context) => const ProductAddEdit(), // Botão de Adicionar Pessoa na Home
        '/edit-product': (context) => const ProductAddEdit(), // Edição de Pessoa na Home, individual em cada Card
      },
    );
  }
}