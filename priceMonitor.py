#!/usr/bin/env python2.7
import keyboard
import winsound
from win32gui import GetWindowText, GetForegroundWindow
import logging
import sys
import os
import pyautogui as pag 
import pytesseract
import PIL
from PIL import Image
import time
from openpyxl import Workbook
from openpyxl import load_workbook
import winsound
from copypaste import copy, paste
import cv2
import imutils
ICMarketsRegion = (594,331,87,608)
pytesseract.pytesseract.tesseract_cmd = r'D:\\Python3\\Tesseract\\tesseract.exe'
while True:
	if keyboard.is_pressed('esc'):
		keyboard.release('esc')
		break	
	#if keyboard.is_pressed('enter'):
	#	keyboard.release('enter')
	name = "Capture.png"
	pag.screenshot(name,region=(1596,336,44,22))
	image = Image.open(name)
	image = image.resize((44*3,77),PIL.Image.ANTIALIAS)
	time.sleep(0.05)
	image.save(name)
	time.sleep(0.05)
	#thresh = 90
	#fn = lambda x : 255 if x < thresh else 0
	#image = image.convert('L').point(fn, mode='1')
	image = cv2.imread("Capture.png")
	image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
	cv2.medianBlur(image,5)
	#image.save(name)
	cv2.imwrite(name,image)
	(thresh, image) = cv2.threshold(image, 90, 255, cv2.THRESH_BINARY_INV)
	#image = cv2.erode(image, None, iterations=1)
	#image = cv2.dilate(image, None, iterations=1)
	#image = imutils.resize(image, width=44*2)
	#image = imutils.resize(image, height=22*2)
	cv2.imwrite(name,image)
	text=pytesseract.image_to_string(Image.open(name),config=r'--oem 3 --psm 6 outputbase digits')#r'--tessdata-dir "D://Python3//Tesseract//tessdata"')
	text = str(text)
	readInfo = text.split('\n')
	for k in range(0,len(readInfo)):
		readInfo[k] = readInfo[k].replace(',','.')
		readInfo[k] = readInfo[k].replace(' ','')
	while '' in readInfo:
		readInfo.remove('')
	try:
		readInfo[0] = float(readInfo[0])
	except:
		pass
	#print(i)
	print(readInfo)	
	#currentWindow = str(GetWindowText(GetForegroundWindow()))
	#print(currentWindow)
	#time.sleep(2)
	#if currentWindow == "IC Markets cTrader 3.7":
	#	print("ok")
