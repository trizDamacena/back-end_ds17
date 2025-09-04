from django.db import models

class Autor(models.Model):
    nome = models.CharField(max_length=255)
    sobrenome = models.CharField(max_length=255)
    nasc = models.DateField(null=False, blank=True)
    nacion = models.CharField(max_length=30, null=True, blank=True)
    biog = models.TextField(null=True, blank=True)  

    def __str__(self):
        return f"{self.nome} {self.sobrenome}"

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
    subtitulo = models.CharField(max_length=255, null=True, blank=True)
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

        if self.subtitulo != "":
            return f"{self.titulo} {self.subtitulo}"
        else:
            return f"{self.titulo}"
        