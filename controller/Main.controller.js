sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("brasileirao.controller.Main", {
            onInit: function () {
/*                 //variaves
                var time = "Cruzeiro";
                var anoFundacao = 1921;
                //Lista 
                var elenco = ["Anderson","Artur Gomes","Bruno Rod", "Felipe"];  

                //Objeto - conjunto de dados agrupados
                var meuTime = {
                    nome : "Cruzeiro",
                    tecnico : "Zé ricardo",
                    anoFundacao : 1921,
                    elenco : ["Anderson","Artur Gomes","Bruno Rod", "Felipe"],
                    cores : "azul e branco", 
                };

                //
                var timesSerieA = [

                    {
                        nome : "Cruzeiro",
                        tecnico : "Zé ricardo",
                        anoFundacao : 1921,
                        elenco : ["Anderson","Artur Gomes","Bruno Rod", "Felipe"],
                        cores : "azul e branco", 
                    },

                    {
                        nome : "Botafogo",
                        tecnico : "Bruno",
                        anoFundacao : 1904,
                        elenco : ["Gatito","Igor Gabriel","Lucas", "Hugo"],
                        cores : "preto e branco", 
                    }
                ];*/

/*                 var dadosGerais = {
                  nomeCampeonato : "Brasileiro 2023 - FioriNET",
                  rodada : 99
                }; 

                var dadosModel = new JSONModel();//Inicializar
                dadosModel.setData(dadosGerais);//Passando os dados criado para o objeto criado
                
                //>>>Associar o model com a view
                var tela = this.getView();  //Obter a instancia da view
                tela.setModel(dadosModel, "ModeloDadosGerais");//Atribuir o modelo(dadosModel) a tela, ModeloDadosGerais(Apelido)
                //<<<>Associar o model com a view
                // debugger */

                //objetos novos para campeonato
                var dadosGerais = {};
                var classificacao = {};
                var partidas = {};
                
                var dadosModel = new JSONModel();
                var classificacaoModel = new JSONModel();
                var partidasModel = new JSONModel();

                dadosModel.setData(dadosGerais);
                classificacaoModel.setData(classificacao);
                partidasModel.setData(partidas);

                var tela = this.getView();
               
                tela.setModel(dadosModel, "ModeloDadosGerais");
                tela.setModel(classificacaoModel, "ModeloTabela");
                tela.setModel(partidasModel, "ModeloPartidas");
                
                  //chamar funçao
                  this.onBuscarClassificacao();
                  this.onBuscarDadosGerais();
                  
            },
            onBuscarClassificacao: function(){
                debugger
                //obter o modelo
                var oModeloTabela = this.getView().getModel("ModeloTabela");
                var configuracoes = {
                  url : "https://api.api-futebol.com.br/v1/campeonatos/10/tabela",
                  method : "GET",
                  async : true,
                  crossDomain : true,
                  headers : {
                     "Authorization" : "Bearer test_c9a52d2342e5b88aad9284c9cc980d"
                  }
                };
                //chamada da API usando AJAX
                  $.ajax(configuracoes).done(
                    
                    function(response){
                        debugger
                        //this.onBuscarClassificacao();
                                 //mudar os dados do model
                                 oModeloTabela.setData(
                                    {
                                      "Classificacao" : response  
                                    } 
                                );
                                  
                                 // this.onBuscarPartidas(rodadaAtual);
                    }.bind(this)

                )
                
            },
            onBuscarDadosGerais: function(){
                debugger
                //obter o modelo
                var oModeloDadosGerais = this.getView().getModel("ModeloDadosGerais");
                 var configuracoes = {
                  url : "https://api.api-futebol.com.br/v1/campeonatos/10",
                  method : "GET",
                  async : true,
                  crossDomain : true,
                  headers : {
                     Authorization : "Bearer test_c9a52d2342e5b88aad9284c9cc980d"
                  }
                }; 
                 
                //chamada da api usando AJAX
                  $.ajax(configuracoes).done(
                   function(response){
                    //this.onBuscarClassificacao();
                    //mudar os dados do model
                    
                    oModeloDadosGerais.setData(response);                         
                     var rodadaAtual = response.rodada_atual.rodada;
                     this.onBuscarPartidas(rodadaAtual);
                   }.bind(this)
                )  
            },  
            
         //
         onBuscarPartidas:function(rodadaAtual){
            //obter o modelo
            debugger
            var oModeloPartidas = this.getView().getModel("ModeloPartidas");
            var configuracoes = {
                              url : "https://api.api-futebol.com.br/v1/campeonatos/10/rodadas/" + rodadaAtual,
                              method : "GET",
                              async : true,
                              crossDomain : true,
                              headers : {
                                 Authorization : "Bearer test_c9a52d2342e5b88aad9284c9cc980d"
                              }
                            }; 

                              $.ajax(configuracoes).done(
                                function(response){
                                 //this.onBuscarClassificacao();
                                 //mudar os dados do model
                                 oModeloPartidas.setData(response);                         
                                 debugger
                                }.bind(this)
                             ) 
            }
         //
        });
    });
