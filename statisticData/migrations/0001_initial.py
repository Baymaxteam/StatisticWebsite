# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Projects',
            fields=[
                ('field_projectid', models.TextField(blank=True, db_column='_projectid', serialize=False, primary_key=True)),
                ('field_teacher_acctid', models.TextField(blank=True, db_column='_teacher_acctid', null=True)),
                ('field_schoolid', models.TextField(blank=True, db_column='_schoolid', null=True)),
                ('school_ncesid', models.TextField(blank=True, null=True)),
                ('school_latitude', models.TextField(blank=True, null=True)),
                ('school_longitude', models.TextField(blank=True, null=True)),
                ('school_city', models.TextField(blank=True, null=True)),
                ('school_state', models.TextField(blank=True, null=True)),
                ('school_zip', models.TextField(blank=True, null=True)),
                ('school_metro', models.TextField(blank=True, null=True)),
                ('school_district', models.TextField(blank=True, null=True)),
                ('school_county', models.TextField(blank=True, null=True)),
                ('school_charter', models.TextField(blank=True, null=True)),
                ('school_magnet', models.TextField(blank=True, null=True)),
                ('school_year_round', models.TextField(blank=True, null=True)),
                ('school_nlns', models.TextField(blank=True, null=True)),
                ('school_kipp', models.TextField(blank=True, null=True)),
                ('school_charter_ready_promise', models.TextField(blank=True, null=True)),
                ('teacher_prefix', models.TextField(blank=True, null=True)),
                ('teacher_teach_for_america', models.TextField(blank=True, null=True)),
                ('teacher_ny_teaching_fellow', models.TextField(blank=True, null=True)),
                ('primary_focus_subject', models.TextField(blank=True, null=True)),
                ('primary_focus_area', models.TextField(blank=True, null=True)),
                ('secondary_focus_subject', models.TextField(blank=True, null=True)),
                ('secondary_focus_area', models.TextField(blank=True, null=True)),
                ('resource_type', models.TextField(blank=True, null=True)),
                ('poverty_level', models.TextField(blank=True, null=True)),
                ('grade_level', models.TextField(blank=True, null=True)),
                ('vendor_shipping_charges', models.TextField(blank=True, null=True)),
                ('sales_tax', models.TextField(blank=True, null=True)),
                ('payment_processing_charges', models.TextField(blank=True, null=True)),
                ('fulfillment_labor_materials', models.TextField(blank=True, null=True)),
                ('total_price_excluding_optional_support', models.TextField(blank=True, null=True)),
                ('total_price_including_optional_support', models.TextField(blank=True, null=True)),
                ('students_reached', models.TextField(blank=True, null=True)),
                ('total_donations', models.TextField(blank=True, null=True)),
                ('num_donors', models.TextField(blank=True, null=True)),
                ('eligible_double_your_impact_match', models.TextField(blank=True, null=True)),
                ('eligible_almost_home_match', models.TextField(blank=True, null=True)),
                ('funding_status', models.TextField(blank=True, null=True)),
                ('date_posted', models.TextField(blank=True, null=True)),
                ('date_completed', models.TextField(blank=True, null=True)),
                ('date_thank_you_packet_mailed', models.TextField(blank=True, null=True)),
                ('date_expiration', models.TextField(blank=True, null=True)),
            ],
            options={
                'managed': False,
                'db_table': 'projects',
            },
        ),
        migrations.CreateModel(
            name='csvFileList',
            fields=[
                ('id', models.AutoField(auto_created=True, serialize=False, primary_key=True, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('date', models.DateField()),
                ('size', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='tableList',
            fields=[
                ('id', models.AutoField(auto_created=True, serialize=False, primary_key=True, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('date', models.DateField()),
                ('size', models.CharField(max_length=50)),
            ],
        ),
    ]
