from django.shortcuts import render
from django.http import HttpResponse
from django.conf import settings
from django.http import JsonResponse
from django.http import HttpResponseRedirect
from django.db import connection
from django.utils.datastructures import MultiValueDictKeyError

import os
import csv
from datetime import datetime
import  json
from statisticData.models import Projects, tableList, idvFileList
import statistics
from scipy import stats
from difflib import Differ
from django.utils import timezone


def upload_file(request):
	try:
		f = request.FILES['CSVfiles'] 
	except MultiValueDictKeyError:
		return HttpResponseRedirect('/P1/')
	CSVfile_Path = os.path.join(settings.BASE_DIR, "CSVfile",f.name)
	wf = open(CSVfile_Path,'bw+')
	wf.write(f.read())
	wf.close()
	# return JsonResponse({'fileSize':f.size, 'fileName': f.name, 'Type:':f.content_type})
	return HttpResponseRedirect('/P1/')

def idvDBlist(request):
	# 檢查idvFileList是否完整
	# 使用raw SQL command
	cursor = connection.cursor()
	cursor.execute("select table_name from information_schema.tables where table_schema='rundjango';") #列表所有TableName
	row =  cursor.fetchall() #取得回傳訊息，會以tuple回傳
	row = [x[0] for x in row]
	database_all_name = [b[9:] for b in row if b.startswith('idvchart_')]
	# 比對DBlist是否有使用者新增table
	# 資料庫新增就新增 刪除就刪除 以資料庫為主
	idvFileList_obj = idvFileList.objects.all()
	table_all_name = [x.name for x in idvFileList_obj]
	dif = list(Differ().compare(table_all_name, database_all_name)) # 比對兩者差異
	add = [b[2:] for b in dif if b.startswith('+')]
	minus = [b[2:] for b in dif if b.startswith('-')]
	print(dif)
	for name in minus :# 移除掉沒有的
		idvFileList.objects.filter(name=name).delete()
	# 有的話，分析size並在DBlist新增一筆，建立時間為現在時間
	for name in add :
		print(name)
		tableSize = [0,0] # row, column 
		cursor.execute("SELECT COUNT(*) FROM idvchart_%s;" % name)
		tableSize[0] = cursor.fetchall()[0][0] # rows
		cursor.execute("SELECT count(*) FROM information_schema.columns WHERE table_name = 'idvchart_%s';" % name) #列表所有TableName	
		tableSize[1] = cursor.fetchall()[0][0] # columns
		idvFileList.objects.create(name=name, date=timezone.now(), size='%dx%d' % tuple(tableSize))
	# 重新取得Table
	idvFileList_obj = idvFileList.objects.all()
	fileDict=[]
	index=0
	for obj in idvFileList_obj:
		index=index+1
		fileDict.append({'index':index, 'name':obj.name, 'size':obj.size, 'date':timezone.localtime(obj.date).strftime("%Y-%m-%d %H:%M:%S")})
	return JsonResponse({'size':len(fileDict), 'data':fileDict})

def ajax_fileList(request):
	CSVfile_DIR = os.path.join(settings.BASE_DIR, "CSVfile")
	fileDict = getCSVFiles(CSVfile_DIR)
	return JsonResponse({'size':len(fileDict), 'data':fileDict})

def calResult(request):
	return render(request,'tool2.html')

def calResultCSV(request):
	return render(request,'LayoutP1.html')

def calResultMySQL(request):
	return render(request,'LayoutP2.html')

def calIDVChart(request):
	return render(request,'LayoutP3.html')

def calRTChart(request):
	return render(request,'LayoutP4.html')

def calDisease(request):
	return render(request,'LayoutP5.html')

def calIndex(request):
	return render(request,'index.html')

def num(s):
    try:
        return float(s)
    except ValueError:
        return s

def ajax_selectFile(request):
	respons = request.GET #return QueryDict
	fileName = respons.get('fileName') #return value
	CSVfile_Path = os.path.join(settings.BASE_DIR, "CSVfile",fileName)
	# 先嘗試UTF-8去讀 出錯則換成Big5
	try:
		f = open(CSVfile_Path,  encoding = 'Big5')
		reader = csv.reader(f)
		data = [row for row in reader]
	except UnicodeDecodeError:
		f = open(CSVfile_Path)
		reader = csv.reader(f)
		data = [row for row in reader]
	header = data.pop(0) #取出header
	wholeData = [list(map(num,row)) for row in data ] # transfer to 2D array
	wholeData = [x for x in wholeData if len(x)>0]
	statList = calStatistics(wholeData)
	return JsonResponse({'title':header, 'data':wholeData , 'statList': statList})

def donorschoose_AJAX(request):
	data = Projects.objects.values('school_state', 'resource_type', 'poverty_level', 'date_posted', 'total_donations')[:50000] # 只調出我們要的column
	data = list(data) #會造成速度很慢.. 要把ValuesQuerySet轉成list
	return JsonResponse(data, safe=False)


def getCSVFiles(CSV_ROOT):
	fileDict=[] 
	index=1
	for f in os.listdir(CSV_ROOT) :
		if f.endswith('.csv') :
			file_DIR = os.path.join(CSV_ROOT,f) 
			fileState = os.stat(file_DIR)
			t=datetime.fromtimestamp(fileState.st_mtime)# 抓取檔案的建立時間		
			fileDict.append({'index':index, 'name':f, 'size':fileState.st_size, 'date':t.strftime('%Y-%m-%d %H:%M:%S')})
			index+=1
	return fileDict

def ajax_requestStreamdata(request): # 取得StreamData GET服務包含兩個內容"fileName"以及"dataNum"(要幾筆資料)
	respons = request.GET #return QueryDict
	fileName = respons.get('fileName') #return value
	dataNum = respons.get('dataNum')
	Streamfile_Path = os.path.join(settings.BASE_DIR, "Streamfile",fileName)
	f = open(Streamfile_Path,'r')
	wholeData = f.readlines()
	f.close()
	wholeData = [x.replace('\n', '').split(",") for x in wholeData]
	return JsonResponse({'data':wholeData[-int(dataNum):]})

def ajax_StreamfileList(request): # 取得StreamDataList 回傳Streamfile資料夾下共有幾個Streamfile
	Streamfile_DIR = os.path.join(settings.BASE_DIR, "Streamfile")
	fileDict = getCSVFiles(Streamfile_DIR)
	return JsonResponse({'size':len(fileDict), 'data':fileDict})

def ajax_selectStreamFile(request):
	respons = request.GET #return QueryDict
	fileName = respons.get('fileName') #return value
	Streamfile_Path = os.path.join(settings.BASE_DIR, "Streamfile",fileName)
	# 先嘗試UTF-8去讀 出錯則換成Big5
	try:
		f = open(Streamfile_Path, encoding = 'Big5')
		reader = csv.reader(f)
		data = [row for row in reader]
	except UnicodeDecodeError:
		f = open(Streamfile_Path)
		reader = csv.reader(f)
		data = [row for row in reader]
	header = ['DateTime', 'Value'] #取出header
	return JsonResponse({'title':header, 'data':[list(map(num,row)) for row in data ]})


def calStatistics(wholeData):
	statList = [["Average"], ["Sum"], ["StdDev"], ["Varrance"], ["Range"],["Max"],["Min"],["SEM"],["Kurtosis"],["Skewed"]]
	for x in range(len(wholeData[0])):
		select_item = [row[x] for row in wholeData]
		select_item = list(map(checkNum, select_item))
		statList[0].append(round(statistics.mean(select_item), 4))
		statList[1].append(round(sum(select_item),4))
		statList[2].append(round(statistics.stdev(select_item),4))
		statList[3].append(round(statistics.variance(select_item),4))
		statList[4].append(round(max(select_item)-min(select_item),4))
		statList[5].append(round(max(select_item),4))
		statList[6].append(round(min(select_item),4))
		statList[7].append(round(stats.sem(select_item),4))
		statList[8].append(round(stats.kurtosis(select_item),4))
		statList[9].append(round(stats.skew(select_item),4))
	return statList

def checkNum(s):
	try:
		return float(s)
	except ValueError:
		return 0


def DBlist(request):
	# 檢查DBlist是否完整
	# 使用raw SQL command
	cursor = connection.cursor()
	cursor.execute("select table_name from information_schema.tables where table_schema='rundjango';") #列表所有TableName
	row =  cursor.fetchall() #取得回傳訊息，會以tuple回傳
	row = [x[0] for x in row]
	database_all_name = [b[12:] for b in row if b.startswith('user_upload_')]
	# 比對DBlist是否有使用者新增table
	# 資料庫新增就新增 刪除就刪除 以資料庫為主
	tablelist_obj = tableList.objects.all()
	table_all_name = [x.name for x in tablelist_obj]
	dif = list(Differ().compare(table_all_name, database_all_name)) # 比對兩者差異
	add = [b[2:] for b in dif if b.startswith('+')]
	minus = [b[2:] for b in dif if b.startswith('-')]
	print(database_all_name)
	print(table_all_name)
	print(dif)
	for name in minus :# 移除掉沒有的
		tableList.objects.filter(name=name).delete()
	# 有的話，分析size並在DBlist新增一筆，建立時間為現在時間
	for name in add :
		tableSize = [0,0] # row, column 
		cursor.execute("SELECT COUNT(*) FROM user_upload_%s;" % name)
		tableSize[0] = cursor.fetchall()[0][0] # rows
		cursor.execute("SELECT count(*) FROM information_schema.columns WHERE table_name = 'user_upload_%s';" % name) #列表所有TableName	
		tableSize[1] = cursor.fetchall()[0][0] # columns
		tableList.objects.create(name=name, date=timezone.now(), size='%dx%d' % tuple(tableSize))
	# 重新取得Table
	tablelist_obj = tableList.objects.all()
	fileDict=[]
	index=0
	for obj in tablelist_obj:
		index=index+1
		fileDict.append({'index':index, 'name':obj.name, 'size':obj.size, 'date':timezone.localtime(obj.date).strftime("%Y-%m-%d %H:%M:%S")})
	return JsonResponse({'size':len(fileDict), 'data':fileDict})

	# return model DBlist
def uploadtoDB(request):
	try:
		f = request.FILES['SQLfiles'] 
	except MultiValueDictKeyError:
		return HttpResponseRedirect('/P2/')
	row = f.read()
	# 檢驗是哪種編碼，以及嘗試分行
	print(row)
	try:
		row = row.decode('big5')
	except:
		row = row.decode('utf-8')
	print(row)
	if row.find('\r\n')>0:
		row = row.split('\r\n')
	else:
		row = row.split('\r')
	print(row)
	titles = row[0].split(',') # default 第一行為titles
	tablename = f.name.split('.')[0].replace(' ','_').replace('-','_')
	SQLcommand_cTable = 'CREATE TABLE user_upload_%s (' % (tablename)
	for x in range(len(titles)):
		SQLcommand_cTable += ('column%d' % (x+1) +' char(100),')
	SQLcommand_cTable = SQLcommand_cTable[:-1]+');'
	cursor = connection.cursor()
	try:
		cursor.execute(SQLcommand_cTable) # 創建table
	except:
		cursor.execute('DELETE FROM user_upload_%s;' % (tablename))
		print('already exist, clean old data')	
	# print(row)
	titles = row.pop(0).replace(',', "','") # default 第一行為titles
	SQLcommand_insert = "INSERT INTO user_upload_%s VALUES ('%s');" % (tablename, titles)
	print(SQLcommand_insert)
	cursor.execute(SQLcommand_insert) # insertData
	for x in row:
		x = x.replace(',', "','")
		SQLcommand_insert = "INSERT INTO user_upload_%s VALUES ('%s');" % (tablename, x)
		try:
			cursor.execute(SQLcommand_insert) # insertData
		except:
			print('DatabaseError');
	# print('Insert complete!')
	# 更新tableList
	tableSize = [0,0] # row, column 
	cursor.execute("SELECT COUNT(*) FROM user_upload_%s;" % tablename)
	tableSize[0] = cursor.fetchall()[0][0] # rows
	cursor.execute("SELECT count(*) FROM information_schema.columns WHERE table_name = 'user_upload_%s';" % tablename) #列表所有TableName	
	tableSize[1] = cursor.fetchall()[0][0] # columns
	tableList.objects.create(name=tablename, date=timezone.now(), size='%dx%d' % tuple(tableSize))
	cursor.close()
	return HttpResponseRedirect('/P2/')


def getDB(request):
	# # 檢查是否存在該table
	# # return table所有資料
	respons = request.GET #return QueryDict
	fileName = respons.get('fileName') #return value
	cursor = connection.cursor()
	cursor.execute("SELECT * FROM user_upload_%s;" % (fileName)) #列表所有TableName
	rows =  cursor.fetchall() #取得回傳訊息，會以tuple回傳
	header = [x for x in rows.pop(0)]
	wholeData = [list(map(num,x)) for x in rows ] # transfer to 2D array
	statList = calStatistics(wholeData)
	return JsonResponse({'title':header, 'data':wholeData , 'statList': statList})

