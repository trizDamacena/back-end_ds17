import pandas as pd
from django.core.management.base import BaseCommand
from django.db import transaction
from api.models import Autor 


class Command(BaseCommand):
    def add_arguments(self, parser):
        parser.add_argument("--arquivo", default="population/autores.csv")
        parser.add_argument("--truncate", action="store_true")
        parser.add_argument("--update", action="store_true")
    
    @transaction.atomic
    def handle(self, *a, **o):
        df = pd.read_csv(o["arquivo"], encoding="utf-8-sig")
        df.columns = [c.strip().lower().lstrip("\ufeff") for c in df.columns]
        
        if o["truncate"]:Autor.objects.all().delete()

        df ["nome"] =  df["nome"].astype(str).str.strip()
        df ["sobrenome"] =  df["sobrenome"].astype(str).str.strip()
        df ["nasc"] = pd.to_datetime(df["nasc"], errors="coerce", format="%Y-%m-%d").dt.date
        df ["nacion"] = df.get("nacion", "").astype(str).str.strip().str.capitalize().replace({"": None})
        
        df = df.query("nome !='' and sobrenome !=''")
        df = df.dropna(subset=['nasc'])

        if o['update']:
            criados = atualizado = 0 
            for r in df.itertuples(index=False):
                _, created = Autor.objects.update_or_create(
                    nome = r.nome, sobrenome = r.sobrenome, nasc = r.nasc, 
                    defaults={"nacion": r.nacion}
                )

                criados += int(created)
                atualizado += int(not created)
            self.stdout.write(self.style.SUCCESS(f'Criados {criados}| Atualizados: {atualizado}'))
        else:
            objs = [Autor(
                nome = r.nome, sobrenome = r.sobrenome, nasc = r.nasc, nacion = r.nacion
            )for r in df.itertuples(index=False)]
            print(objs)
            Autor.objects.bulk_create(objs, ignore_conflicts=True)
            self.stdout.write(self.style.SUCCESS(f'Criados {len(objs)}'))
            
            