from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, DestroyAPIView, RetrieveDestroyAPIView, RetrieveUpdateDestroyAPIView
from .models import Autor, Editora, Livro
from .serializers import AutorSerializers, EditoraSerializers, LivroSerializers
from rest_framework.decorators import api_view #bibliotecas para a metódo com decoretor
from rest_framework.response import Response
from rest_framework import status

#Autores-----------------------------------------
class AutoresView(ListCreateAPIView):
    queryset = Autor.objects.all() 
    serializer_class = AutorSerializers

class AutoresDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Autor.objects.all()
    serializer_class = AutorSerializers


#Editora------------------------------------------
class EditorasView(ListCreateAPIView):
    queryset = Editora.objects.all()
    serializer_class = EditoraSerializers

class EditorasDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Editora.objects.all()
    serializer_class = EditoraSerializers


#Livro------------------------------------------
class LivrosView(ListCreateAPIView):
    queryset = Livro.objects.all()
    serializer_class = LivroSerializers

class LivrosDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Livro.objects.all()
    serializer_class = LivroSerializers

#----------------------------------------------
class ExcluirAutorView(DestroyAPIView): #feito por mim
    queryset = Autor.objects.all()
    serializer_class = AutorSerializers



#outros métodos
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
        
