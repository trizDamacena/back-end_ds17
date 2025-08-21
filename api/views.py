from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView
from .models import Autor, Editora, Livro
from .serializers import AutorSerializers, EditoraSerializers, LivroSerializers
from rest_framework.decorators import api_view #bibliotecas para a metódo com decoretor
from rest_framework.response import Response
from rest_framework import status


class AutoresView(ListCreateAPIView):
    queryset = Autor.objects.all() 
    serializer_class = AutorSerializers

class EditorasView(ListCreateAPIView):
    queryset = Editora.objects.all()
    serializer_class = EditoraSerializers

class LivrosView(ListCreateAPIView):
    queryset = Livro.objects.all()
    serializer_class = LivroSerializers

def visualizacao(request):
    autores = Autor.objects.all()
    return render(request,"todo/index.html", {"autores": autores})

@api_view(['GET', 'POST'])
def list_autor(request):
    if request.method == 'GET':
        queryset = Autor.objects.all()
        serializer = AutorSerializers(queryset, many = True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = AutorSerializers(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)
        
