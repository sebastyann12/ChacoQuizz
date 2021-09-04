# Generated by Django 3.2.6 on 2021-08-28 19:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('trivia', '0003_pregunta'),
    ]

    operations = [
        migrations.CreateModel(
            name='Categoria',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=20)),
            ],
            options={
                'verbose_name': 'Categoria',
                'verbose_name_plural': 'Categorias',
            },
        ),
        migrations.DeleteModel(
            name='Jugador',
        ),
        migrations.DeleteModel(
            name='Pregunta',
        ),
    ]
