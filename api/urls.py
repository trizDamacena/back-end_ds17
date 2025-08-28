from django.urls import path
from .views import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)


urlpatterns = [
    path('Autores', AutoresView.as_view()),
    path('authors', list_autor),
    path('Template', visualizacao),
    path('Editoras/', EditorasView.as_view()),
    path('Livros/', LivrosView.as_view()),
    path('buscar/', AutoresView.as_view()),
    
    #delete/update
    path('autor/<int:pk>', AutoresDetailView.as_view()),
    path('editora/<int:pk>', EditorasDetailView.as_view()),
    path('livro/<int:pk>', LivrosDetailView.as_view()),
    
    #feitos por mim
    path('Autores/Delete/<int:pk>', ExcluirAutorView.as_view()),

    #Token de autenticação
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
