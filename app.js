(function () {
  "use strict";

  var apiUrl = "https://api-fake-blog.onrender.com/postagens";

  var imagensLocais = [
    "IMG/google-news.jpg",
    "IMG/macbookIMG_1008.jpg",
    "IMG/Citroen Ami Buggy.webp",
    "IMG/sega.jpg",
    "IMG/metaverse-weg 3 virtual-love-collage_52683-89576.jpg",
    "IMG/Metaverso .webp"
  ];

  function obterIndiceDaPublicacao() {
    var resultado = window.location.search.match(/[?&]post=(\d+)/);
    var indice = resultado ? parseInt(resultado[1], 10) : 0;

    return isNaN(indice) || indice < 0 ? 0 : indice;
  }

  function contemTermoDeInteligenciaArtificial(publicacao) {
    var texto = [
      publicacao.categoria,
      publicacao.category,
      publicacao.title,
      publicacao.description,
      publicacao.thumbImageAltText
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    var termos = [
      "inteligência artificial",
      "inteligencia artificial",
      "artificial intelligence",
      "machine learning",
      "deep learning",
      "google",
      "metaverso"
    ];

    return termos.some(function (termo) {
      return texto.indexOf(termo) !== -1;
    });
  }

  function configurarPublicacao(publicacao, indice) {
    if (!publicacao) {
      return publicacao;
    }

    publicacao.indiceOriginal = indice;
    publicacao.imagemLocal =
      imagensLocais[indice % imagensLocais.length] || imagensLocais[0];

    return publicacao;
  }

  function carregarPublicacoes($http, sucesso, erro, finalizacao) {
    $http
      .get(apiUrl)
      .then(function (response) {
        var publicacoes = Array.isArray(response.data) ? response.data : [];

        sucesso(publicacoes);
      })
      .catch(function (error) {
        console.error("Erro ao carregar as publicações:", error);
        erro(error);
      })
      .finally(finalizacao);
  }

  angular
    .module("blog", [])
    .controller("Rest", function ($scope, $http) {
      $scope.publicacoes = [];
      $scope.imagensLocais = imagensLocais;
      $scope.carregando = true;
      $scope.erro = false;

      carregarPublicacoes(
        $http,
        function (publicacoes) {
          $scope.publicacoes = publicacoes.map(configurarPublicacao);
        },
        function () {
          $scope.erro = true;
        },
        function () {
          $scope.carregando = false;
        }
      );
    })
    .controller("Newsletter", function ($scope, $http) {
      var backendUrl = "http://localhost:3333/api/inscritos";

      $scope.emailInscrito = "";
      $scope.enviandoInscricao = false;
      $scope.mensagemInscricao = "";
      $scope.erroInscricao = false;

      $scope.cadastrarInscrito = function () {
        if (!$scope.emailInscrito || $scope.enviandoInscricao) {
          return;
        }

        $scope.enviandoInscricao = true;
        $scope.mensagemInscricao = "";
        $scope.erroInscricao = false;

        $http
          .post(backendUrl, {
            email: $scope.emailInscrito
          })
          .then(function (response) {
            $scope.mensagemInscricao = response.data.mensagem;
            $scope.emailInscrito = "";
          })
          .catch(function (error) {
            $scope.erroInscricao = true;
            $scope.mensagemInscricao =
              error.data && error.data.mensagem
                ? error.data.mensagem
                : "Não foi possível concluir o cadastro.";
          })
          .finally(function () {
            $scope.enviandoInscricao = false;
          });
      };
    })
    .controller("Category", function ($scope, $http) {
      $scope.publicacoes = [];
      $scope.imagensLocais = imagensLocais;
      $scope.carregando = true;
      $scope.erro = false;

      carregarPublicacoes(
        $http,
        function (publicacoes) {
          $scope.publicacoes = publicacoes
            .map(configurarPublicacao)
            .filter(contemTermoDeInteligenciaArtificial);
        },
        function () {
          $scope.erro = true;
        },
        function () {
          $scope.carregando = false;
        }
      );
    })
    .controller("Leitura", function ($scope, $http) {
      var indice = obterIndiceDaPublicacao();

      $scope.publicacao = null;
      $scope.carregando = true;
      $scope.erro = false;

      carregarPublicacoes(
        $http,
        function (publicacoes) {
          $scope.publicacao = configurarPublicacao(
            publicacoes[indice] || publicacoes[0] || null,
            indice
          );
        },
        function () {
          $scope.erro = true;
        },
        function () {
          $scope.carregando = false;
        }
      );
    });
})();
