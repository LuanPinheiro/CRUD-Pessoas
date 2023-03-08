import "package:flutter/material.dart";
import 'package:snippet_coder_utils/ProgressHUD.dart';
// Widget de adicionar e editar produtos
class ProductAddEdit extends StatefulWidget {
  const ProductAddEdit({Key? key}) : super(key: key);

  @override
  _ProductAddEditState createState() => _ProductAddEditState();
}

class _ProductAddEditState extends State<ProductAddEdit> {
  static final GlobalKey<FormState> globalKey = GlobalKey<FormState>();
  bool isAPICallProcess = false;
  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        // Scaffold de página de adicionar nova pessoa
        appBar: AppBar(
          title: const Text("Flutter Node CRUD - Adicionar"),
          elevation: 0,
        ),
        backgroundColor: Colors.grey,
        body: ProgressHUD(
          child: Form(
            key: globalKey,
            child: Text("test"),
          ),
          inAsyncCall: isAPICallProcess,
          opacity: .3,
          key: UniqueKey(),
        ),
      )
    );
  }
}
