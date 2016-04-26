# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('statisticData', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='csvfilelist',
            name='date',
            field=models.DateTimeField(),
        ),
        migrations.AlterField(
            model_name='tablelist',
            name='date',
            field=models.DateTimeField(),
        ),
    ]
