# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('statisticData', '0002_auto_20151023_0429'),
    ]

    operations = [
        migrations.AlterModelTable(
            name='projects',
            table='idvchat_projects',
        ),
    ]
