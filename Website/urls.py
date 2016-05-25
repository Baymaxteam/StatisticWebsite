"""Website URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf.urls import include, url
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from statisticData.views import *

urlpatterns = [
    url(r'^index/', calIndex),
    url(r'^idvDBlist/', idvDBlist),
    url(r'^getDB/', getDB),
    url(r'^DBlist/', DBlist),
    url(r'^uploadtoDB/', uploadtoDB),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^P1/', calResultCSV),
    url(r'^P2/', calResultMySQL),
    url(r'^P3/', calIDVChart),
    url(r'^P4/', calRTChart),
    url(r'^P5/', calDisease),
    url(r'^donorschoose_AJAX/', donorschoose_AJAX),
    url(r'^ajax_filelist/$', 'statisticData.views.ajax_fileList', name='ajax-fileList'),
    url(r'^ajax_selectFile/$', 'statisticData.views.ajax_selectFile', name='ajax-selectFile'),
    url(r'^ajax_selectFilePart2/$', 'statisticData.views.ajax_selectFilePart2', name='ajax_selectFilePart2'),
    url(r'^uploadCSV/$', upload_file),
    url(r'^ajax_requestStreamdata/$', 'statisticData.views.ajax_requestStreamdata', name='ajax-requestStreamdata'),
    url(r'^ajax_StreamfileList/$', 'statisticData.views.ajax_StreamfileList', name='ajax-StreamfileList'),
    url(r'^ajax_selectStreamFile/$', 'statisticData.views.ajax_selectStreamFile', name='ajax-selectStreamFile'),

    # part 2 django 0510
    url(r'^Bike/', calBike),
    url(r'^Factory/', calFactory),
    url(r'^PM25/', calPM25),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
