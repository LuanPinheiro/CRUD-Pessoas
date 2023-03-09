import "package:flutter/material.dart";
import 'package:snippet_coder_utils/ProgressHUD.dart';
import 'package:snippet_coder_utils/FormHelper.dart';
import 'package:image_picker/image_picker.dart';
import 'package:untitled/models/product_model.dart';
import 'dart:io';

// Widget de adicionar e editar produtos
class ProductAddEdit extends StatefulWidget {
  const ProductAddEdit({Key? key}) : super(key: key);

  @override
  _ProductAddEditState createState() => _ProductAddEditState();
}

class _ProductAddEditState extends State<ProductAddEdit> {
  static final GlobalKey<FormState> globalKey = GlobalKey<FormState>();
  bool isAPICallProcess = false;
  ProductModel? productModel;
  bool isEditMode = false;
  bool isImageSelected = false;

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
            child: pessoaForm(),
          ),
          inAsyncCall: isAPICallProcess,
          opacity: .3,
          key: UniqueKey(),
        ),
      )
    );
  }

  @override
  void initState(){
    super.initState();
    productModel = ProductModel();

    Future.delayed(Duration.zero, () {
      if(ModalRoute.of(context)?.settings.arguments != null){
        final Map arguments = ModalRoute.of(context)?.settings.arguments as Map;

        productModel = arguments["model"];
        isEditMode = true;
        setState(() {});
      }
    });
  }

  Widget pessoaForm() {
    return SingleChildScrollView(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.start,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Caixa de entrada de nome
          Padding(
            padding: const EdgeInsets.only(top: 10, bottom: 10),
            child: FormHelper.inputFieldWidget(
              context,
              "nome",
              "Nome da Pessoa",
              (onValidateVal) {
                if(onValidateVal.isEmpty){
                  return "O campo nome não pode ser vazio";
                }
                return null;
              },
              (onSavedVal) => {
                productModel!.nome = onSavedVal,
              },
              initialValue: productModel!.nome == null ? "" : productModel!.nome.toString(),
              // Abaixo configurações das cores do formulário
              borderColor: Colors.black,
              borderFocusColor: Colors.black,
              textColor: Colors.black,
              hintColor: Colors.black.withOpacity(.7),
            ),
          ),
          Padding(
            padding: const EdgeInsets.only(top: 10, bottom: 10),
            child: FormHelper.inputFieldWidget(
              context,
              "cpf",
              "CPF da Pessoa",
              (onValidateVal) {
                if(onValidateVal.isEmpty){
                  return "O campo CPF não pode ser vazio";
                }
                return null;
              },
              (onSavedVal) {
                productModel!.cpf = onSavedVal;
              },
              initialValue: productModel!.cpf == null ? "" : productModel!.cpf.toString(),
              // Abaixo configurações das cores do formulário
              borderColor: Colors.black,
              borderFocusColor: Colors.black,
              textColor: Colors.black,
              hintColor: Colors.black.withOpacity(.7),
            ),
          ),
          picPicker(false, "", (file) {}),
          const SizedBox(
            height: 20,
          ),
          Center(
            child: FormHelper.submitButton("Salvar", () {
              if(validateAndSave()){
                // API Service
              }
            },
            btnColor: Colors.red,),
          )
        ]
      ),
    );
  }

  bool validateAndSave() {
    final form = globalKey.currentState;
    if(form!.validate()){
      form.save();
      return true;
    }

    return false;
  }
  static Widget picPicker(bool isFileSelected, String fileName, Function onFilePicked) {
    Future<XFile?> _imageFile;
    ImagePicker _picker = ImagePicker();

    return Column(
      children: [
        fileName.isNotEmpty ?
        isFileSelected ? Image.file(File(fileName), height: 200, width: 200,)
        : SizedBox(child: Image.network(fileName, height: 200, width: 200, fit: BoxFit.scaleDown,),)
        : SizedBox(child: Image.network("https://pwco.com.sg/wp-content/uploads/2020/05/Generic-Profile-Placeholder-v3-1536x1536.png", height: 200, width: 200, fit: BoxFit.scaleDown,),),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            SizedBox(
              height: 35.0,
              width: 35.0,
              child: IconButton(
                padding: const EdgeInsets.all(0),
                icon: const Icon(Icons.image, size: 35,),
                onPressed:() {
                  _imageFile = _picker.pickImage(source: ImageSource.gallery);
                  _imageFile.then((file) async{
                    onFilePicked(file);
                  });
                },
              )
            )
          ],
        ),
      ],
    );
  }
}
