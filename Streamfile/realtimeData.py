import random
import os
from datetime import datetime, timedelta
from sys import argv
import time

def updateData(filename):
	if lineCounter < 100 :
		streamFile = open(filename,'w+')
		for x in range(100):
			temp = random.uniform(15, 35)
			temp = round(temp, 2)
			data = str(datetime.now()-timedelta(seconds=99-x)).replace(' ','T')+','+str(temp)+'\n'
			streamFile.write(data)
		streamFile.close()
	else:
		streamFile = open(filename,'r+')
		wholestr = streamFile.readlines()
		wholestr.pop(0)
		temp = random.uniform(15, 35)
		temp = round(temp, 2)
		data = str(datetime.now()).replace(' ','T')+','+format(temp, '.2f')+'\n'
		print(data)
		wholestr.append(data)
		streamFile.seek(0,0)
		streamFile.write(''.join(wholestr))
		streamFile.close()

script, filename = argv
if os.path.exists(filename):
	streamFile = open(filename,"r+")
else:
	streamFile = open(filename,"w+")

lineCounter = len(streamFile.readlines())
streamFile.close()
print('lineCounter:'+str(lineCounter))
while True :
	updateData(filename)
	time.sleep(1)
