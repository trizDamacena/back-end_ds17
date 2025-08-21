from django.urls import path
from .views import *

urlpatterns = [
    path('Autores', AutoresView.as_view()),
    path('authors', list_autor),
    path('Template', visualizacao),
    path('Editoras/', EditorasView.as_view()),
    path('Livros/', LivrosView.as_view()),
    
    #delete 
    path('autor/<int:pk>', AutoresDetailView.as_view()),
    path('editora/<int:pk>', EditorasDetailView.as_view()),
    path('livro/<int:pk>', LivrosDetailView.as_view()),
    
    #feitos por mim
    path('Autores/Delete/<int:pk>', ExcluirAutorView.as_view())
]
