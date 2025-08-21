from django.db import models

class Autor(models.Model):
    nome_autor = models.CharField(max_length=255)
    sobrenome_autor = models.CharField(max_length=255)
    data_nascimento_autor = models.DateField(null=False, blank=True)
    nation_autor = models.CharField(max_length=30, null=True, blank=True)
    biografia_autor = models.TextField(null=True, blank=True)  

    def __str__(self):
        return f"{self.nome_autor} {self.sobrenome_autor}"

class Editora(models.Model):
    nome_editora = models.CharField(max_length=255)
    cnpj = models.CharField(max_length=18, unique=True, null=True, blank=True)
    endereco_editora = models.CharField(max_length=200, null=True, blank=True)
    telefone_editora = models.CharField(max_length=20, null=True, blank=True)
    email = models.EmailField(null=True, blank=True)
    site = models.URLField(null=True, blank=True)

    def __str__(self):
        return f"{self.nome_editora}"
    

class Livro(models.Model):
    titulo = models.CharField(max_length=50)
    subtitulo = models.CharField(max_length=255)
    autor = models.ForeignKey(Autor, on_delete=models.CASCADE)
    editora = models.ForeignKey(Editora, on_delete=models.CASCADE)
    isbn = models.CharField(max_length=255)
    descricao = models.TextField()
    idioma = models.CharField(max_length=255, default="Português")
    ano_publicacao = models.IntegerField()
    paginas = models.IntegerField()
    preco = models.DecimalField(max_digits=10, decimal_places=2)
    estoque = models.IntegerField()
    desconto = models.DecimalField(max_digits=10, decimal_places=2)
    disponivel = models.BooleanField(default=True)
    dimensoes = models.CharField(max_length=255)
    peso = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.titulo} {self.subtitulo}"