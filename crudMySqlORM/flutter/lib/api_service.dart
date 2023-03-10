import 'dart:convert';
import 'dart:io';

import 'package:http/http.dart' as http;
import 'package:untitled/models/product_model.dart';

import '../../config.dart';

class APIService {
  static var client = http.Client();

  static Future<List<ProductModel>?> getProducts() async {
    Map<String, String> requestHeaders = {'Content-Type': 'application/json'};

    var url = Uri.http(Config.apiURL, Config.productURL);

    var response = await client.get(url, headers: requestHeaders);
    print(response.statusCode);

    if(response.statusCode == 200){
      print("ola");
      print(response.body);
      var data = jsonDecode(response.body);
      print("oi");
      return productsFromJson(data["data"]);
    }
    else{

      return null;
    }
  }

  // static Future<bool> saveProduct(
  //     ProductModel model,
  //     bool isEditMode,
  //   ) async {
  //   var productURL = Config.productURL;
  //
  //   if(isEditMode){
  //     productURL = productURL + "/" + model.id.toString();
  //   }
  //   Map<String, String> requestHeaders = {'Content-Type': 'application/json'};
  //
  //   var url = Uri.http(Config.apiURL, productURL);
  //
  //   var requestMethod = isEditMode ? "PUT" : "POST";
  //
  //   var request = http.MultipartRequest(requestMethod, url);
  //   request.fields["nome"] = model.nome!;
  //   request.fields["cpf"] = model.cpf!;
  //
  //   var response = await request.send();
  //
  //   if(response.statusCode == 200){
  //     return true;
  //   }
  //   else{
  //     return false;
  //   }
  // }
}