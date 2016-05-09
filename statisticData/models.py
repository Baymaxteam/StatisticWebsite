from __future__ import unicode_literals
from django.db import models

class tableList(models.Model):
    name = models.CharField(max_length=255)
    date = models.DateTimeField()
    size = models.CharField(max_length=50)

    def __str__(self):              # __unicode__ on Python 2
        return self.name

class csvFileList(models.Model):
    name = models.CharField(max_length=255)
    date = models.DateTimeField()
    size = models.CharField(max_length=50)

    def __str__(self):              # __unicode__ on Python 2
        return self.name

class idvFileList(models.Model):
    name = models.CharField(max_length=255)
    date = models.DateTimeField()
    size = models.CharField(max_length=50)

    def __str__(self):              # __unicode__ on Python 2
        return self.name


class Projects(models.Model):
    field_projectid = models.TextField(db_column='_projectid', blank=True, null=False, primary_key=True)  # Field renamed because it started with '_'.
    field_teacher_acctid = models.TextField(db_column='_teacher_acctid', blank=True, null=True)  # Field renamed because it started with '_'.
    field_schoolid = models.TextField(db_column='_schoolid', blank=True, null=True)  # Field renamed because it started with '_'.
    school_ncesid = models.TextField(blank=True, null=True)
    school_latitude = models.TextField(blank=True, null=True)
    school_longitude = models.TextField(blank=True, null=True)
    school_city = models.TextField(blank=True, null=True)
    school_state = models.TextField(blank=True, null=True)
    school_zip = models.TextField(blank=True, null=True)
    school_metro = models.TextField(blank=True, null=True)
    school_district = models.TextField(blank=True, null=True)
    school_county = models.TextField(blank=True, null=True)
    school_charter = models.TextField(blank=True, null=True)
    school_magnet = models.TextField(blank=True, null=True)
    school_year_round = models.TextField(blank=True, null=True)
    school_nlns = models.TextField(blank=True, null=True)
    school_kipp = models.TextField(blank=True, null=True)
    school_charter_ready_promise = models.TextField(blank=True, null=True)
    teacher_prefix = models.TextField(blank=True, null=True)
    teacher_teach_for_america = models.TextField(blank=True, null=True)
    teacher_ny_teaching_fellow = models.TextField(blank=True, null=True)
    primary_focus_subject = models.TextField(blank=True, null=True)
    primary_focus_area = models.TextField(blank=True, null=True)
    secondary_focus_subject = models.TextField(blank=True, null=True)
    secondary_focus_area = models.TextField(blank=True, null=True)
    resource_type = models.TextField(blank=True, null=True)
    poverty_level = models.TextField(blank=True, null=True)
    grade_level = models.TextField(blank=True, null=True)
    vendor_shipping_charges = models.TextField(blank=True, null=True)
    sales_tax = models.TextField(blank=True, null=True)
    payment_processing_charges = models.TextField(blank=True, null=True)
    fulfillment_labor_materials = models.TextField(blank=True, null=True)
    total_price_excluding_optional_support = models.TextField(blank=True, null=True)
    total_price_including_optional_support = models.TextField(blank=True, null=True)
    students_reached = models.TextField(blank=True, null=True)
    total_donations = models.TextField(blank=True, null=True)
    num_donors = models.TextField(blank=True, null=True)
    eligible_double_your_impact_match = models.TextField(blank=True, null=True)
    eligible_almost_home_match = models.TextField(blank=True, null=True)
    funding_status = models.TextField(blank=True, null=True)
    date_posted = models.TextField(blank=True, null=True)
    date_completed = models.TextField(blank=True, null=True)
    date_thank_you_packet_mailed = models.TextField(blank=True, null=True)
    date_expiration = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'idvchart_projects'
