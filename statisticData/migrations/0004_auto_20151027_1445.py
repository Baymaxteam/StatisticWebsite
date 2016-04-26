# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('statisticData', '0003_auto_20151025_1448'),
    ]

    operations = [
        migrations.CreateModel(
            name='idvFileList',
            fields=[
                ('id', models.AutoField(verbose_name='ID', auto_created=True, serialize=False, primary_key=True)),
                ('name', models.CharField(max_length=255)),
                ('date', models.DateTimeField()),
                ('size', models.CharField(max_length=50)),
            ],
        ),
        migrations.AlterModelTable(
            name='projects',
            table='idvchart_projects',
        ),
    ]
