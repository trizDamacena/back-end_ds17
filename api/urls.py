from django.urls import path
from .views import *

urlpatterns = [
    path('Autores', AutoresView.as_view()),
    path('authors', list_autor),
    path('Template', visualizacao),
    path('Editoras/', EditorasView.as_view()),
    path('Livros/', LivrosView.as_view())
]
