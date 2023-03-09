import 'dart:convert';
import 'dart:io';

import 'package:http/http.dart' as http;
import 'package:untitled/models/product_model.dart';

import '../../config.dart';

class APIService {
  static var client = http.Client();

  static Future<List<ProductModel>?> getProducts() async {
    Map<String, String> requestHeaders = {'Content-Type': 'application/json', "Accept": "application/json"};

    var url = Uri.https(Config.apiURL, Config.productURL);
    print('Antes de response');
    var response = await client.get(url, headers: requestHeaders);
    print('Depois de Response');
    print('Status code: ${response.statusCode}');
    print('Response body: ${response.body}');
    if(response.statusCode == 200){
      var data = jsonDecode(response.body);
      print("ok");
      return productsFromJson(data["data"]);
    }
    else{
      print("fail");
      return null;
    }
  }

  static Future<bool> saveProduct(
      ProductModel model,
      bool isEditMode,
    ) async {
    var productURL = Config.productURL;

    if(isEditMode){
      productURL = productURL + "/" + model.id.toString();
    }
    Map<String, String> requestHeaders = {'Content-Type': 'application/json'};

    var url = Uri.http(Config.apiURL, productURL);

    var requestMethod = isEditMode ? "PUT" : "POST";

    var request = http.MultipartRequest(requestMethod, url);
    request.fields["nome"] = model.nome!;
    request.fields["cpf"] = model.cpf!;

    var response = await request.send();

    if(response.statusCode == 200){
      return true;
    }
    else{
      return false;
    }
  }
}