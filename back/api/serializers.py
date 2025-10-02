from rest_framework import serializers
from .models import Autor, Editora, Livro

class AutorSerializers(serializers.ModelSerializer):
    class Meta:
        model = Autor
        fields = ['nome', 'sobrenome', 'nasc', 'nacion', 'biog']

class EditoraSerializers(serializers.ModelSerializer):
    class Meta:
        model = Editora 
        fields = ['editora', 'cnpj', 'endereco', 'telefone', 'email', 'site']

class LivroSerializers(serializers.ModelSerializer):

    autor = serializers.CharField(source='autor.nome', read_only=True)
    editora = serializers.CharField(source='editora.editora', read_only=True)
    
    class Meta:
        model = Livro
        fields = ['titulo', 'subtitulo', 'autor', 'editora', 'isbn', 'descricao', 'idioma', 'ano_publicacao', 'paginas', 'preco', 'estoque', 'desconto', 'disponivel', 'dimensoes', 'peso']