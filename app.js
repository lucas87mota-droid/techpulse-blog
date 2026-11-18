(function () {
  "use strict";

  /*
    URL da API externa que fornece as notícias.
  */
  var apiUrl =
    "https://api-fake-blog.onrender.com/postagens";

  /*
    Dados do projeto Supabase.

    Substitua os textos abaixo pelos dados reais
    encontrados em:

    Supabase
    → Project Settings
    → API

    Use somente a chave pública/anon/publishable.
    Nunca use a service_role key no navegador.
  */
  var supabaseUrl =
    "https://rhpjbzxhzdbblyzzhhqy.supabase.co";

  var supabaseKey =
    "sb_publishable_cY6TL7ksU6qoY1OyF4sgMw_Po_c5BJZ";

  /*
    Cria a conexão com o Supabase.
  */
  var supabaseClient = window.supabase.createClient(
    supabaseUrl,
    supabaseKey
  );

  /*
    Obtém o índice da publicação pela URL.

    Exemplo:

    leitura.html?post=2

    Resultado:

    índice 2
  */
  function obterIndiceDaPublicacao() {
    var resultado = window.location.search.match(
      /[?&]post=(\d+)/
    );

    var indice = resultado
      ? parseInt(resultado[1], 10)
      : 0;

    return isNaN(indice) || indice < 0
      ? 0
      : indice;
  }

  /*
    Módulo principal do AngularJS.
  */
  angular
    .module("blog", [])

    /*
      Controller usado pelo index.html.
    */
    .controller("Rest", function ($scope, $http ) {
      /*
        Variáveis utilizadas para carregar as notícias.
      */
      $scope.publicacoes = [];
      $scope.carregando = true;
      $scope.erro = false;

      $scope.imagensLocais = [
        "IMG/google-news.jpg",
        "IMG/macbookIMG_1008.jpg",
        "IMG/Citroen Ami Buggy.webp",
        "IMG/sega.jpg",
        "IMG/Metaverso .webp",
        "IMG/metaverse-weg 3 virtual-love-collage_52683-89576.jpg"
      ];


      /*
        Variáveis utilizadas pelo formulário
        de cadastro no Supabase.
      */
      $scope.novoInscrito = {
        email: ""
      };

      $scope.salvandoInscrito = false;
      $scope.inscricaoSucesso = false;
      $scope.inscricaoErro = false;

      /*
        Função responsável por cadastrar o e-mail
        na tabela "inscritos" do Supabase.
      */
      $scope.cadastrarInscrito = function () {
        /*
          Inicia o estado de carregamento do botão.
        */
        $scope.salvandoInscrito = true;

        /*
          Limpa mensagens anteriores.
        */
        $scope.inscricaoSucesso = false;
        $scope.inscricaoErro = false;

        /*
          Envia o e-mail para a tabela "inscritos".
        */
        supabaseClient
          .from("inscritos")
          .insert([
            {
              email: $scope.novoInscrito.email
            }
          ])
          .then(function (resultado) {
            /*
              Se o Supabase retornar erro,
              interrompe o fluxo e vai para o catch.
            */
            if (resultado.error) {
              throw resultado.error;
            }

            /*
              Limpa o campo do formulário.
            */
            $scope.novoInscrito.email = "";

            /*
              Exibe a mensagem de sucesso.
            */
            $scope.inscricaoSucesso = true;
          })
          .catch(function (error) {
            /*
              Exibe o erro no console
              e mostra a mensagem no HTML.
            */
            console.error(
              "Erro ao cadastrar e-mail:",
              error
            );

            $scope.inscricaoErro = true;
          })
          .finally(function () {
            /*
              Libera o botão novamente.
            */
            $scope.salvandoInscrito = false;

            /*
              Atualiza a tela do AngularJS.
            */
            $scope.$applyAsync();
          });
      };

      /*
        Busca as notícias na API.
      */
      $http
        .get(apiUrl)

        /*
          Executado quando a API responde com sucesso.
        */
        .then(function (response) {
          $scope.publicacoes = response.data || [];
        })

        /*
          Executado quando ocorre erro na API.
        */
        .catch(function (error) {
          console.error(
            "Erro ao carregar as publicações:",
            error
          );

          $scope.erro = true;
        })

        /*
          Executado quando o carregamento termina,
          com sucesso ou com erro.
        */
        .finally(function () {
          $scope.carregando = false;
        });
    })

    /*
      Controller usado pelo leitura.html.
    */
    .controller("Leitura", function ($scope, $http ) {
      /*
        Obtém o índice da publicação pela URL.
      */
      var indice = obterIndiceDaPublicacao();

      /*
        Variáveis utilizadas na página de leitura.
      */
      $scope.publicacao = null;
      $scope.carregando = true;
      $scope.erro = false;

      /*
        Busca todas as publicações na API.
      */
      $http
        .get(apiUrl)

        /*
          Seleciona somente a publicação
          correspondente ao índice da URL.
        */
        .then(function (response) {
          var publicacoes = response.data || [];

          $scope.publicacao =
            publicacoes[indice] ||
            publicacoes[0] ||
            null;
        })

        /*
          Trata erros da página de leitura.
        */
        .catch(function (error) {
          console.error(
            "Erro ao carregar a publicação:",
            error
          );

          $scope.erro = true;
        })

        /*
          Finaliza o carregamento.
        */
        .finally(function () {
          $scope.carregando = false;
        });
    });
})();
