import pandas as pd
from django.core.management import BaseCommand
from django.db import transaction
from api.models import Livro
from decimal import Decimal
from sqlalchemy import select, table, column

class Command(BaseCommand):
    def add_arguments(self, parser):
        parser.add_argument("--arquivo", default="population/livros.csv")
        parser.add_argument("--truncate", action="store_true")
        parser.add_argument("--update", action="store_true")
        parser.add_argument("--column")

        
    
    @transaction.atomic
    def handle(self, *a, **o):
        df = pd.read_csv(o["arquivo"], encoding="utf-8-sig")
        df.columns = [c.strip().lower().lstrip("\ufeff")for c in df.columns]

        if o["truncate"]:Livro.objects.all().delete()

        df ["titulo"] = df["titulo"].astype(str).str.strip()
        df ["subtitulo"] = df["subtitulo"].astype(str).str.strip()
        df ["ibsn"] = df["ibsn"].astype(str).str.strip()
        df ["descricao"] = df["descricao"].astype(str)
        df ["idioma"] = df["idioma"].astype(str).str.strip()
        df ["ano_publicacao"] = df["ano_publicacao"].astype(int)
        df ["paginas"] = df["paginas"].astype(int)
        df ["preco"] = df["preco"].astype(str).apply(Decimal)
        df ["estoque"] = df["estoque"].astype(int)
        df ["desconto"] = df.get("desconto", "").astype(str).str.strip().str.capitalize().replace({"": None})
        df ["disponivel"] = df["disponivel"].astype(bool)
        df ["dimensoes"] = df["dimensoes"].astype(str)
        df ["peso"] = df["peso"].astype(Decimal)
        
        endereco_tabela  = table('api_autor',
                                 column('id'))
        
        df ["autor_id"] = 1