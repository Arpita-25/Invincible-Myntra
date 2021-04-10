# coding=utf-8
from PIL import Image
import cv2
import numpy as np
import file_w
import evaluate_pose_JPPNet_s2
import evaluate_parsing_JPPNet_s2
from test2 import *
import json

def JPPNet_wrapper():
    #resizing image
    img=Image.open(r'C:\Users\lenovo\Desktop\try_on\custom\test\image/000183_0.jpg')
    img = img.resize((192,256))
    #print(img.size)
    img.save(r'C:\Users\lenovo\Desktop\try_on\custom\test\image/000183_0.jpg')

    #file_writing
    file_w.f_write()

    #............................pose_estimation................................
    evaluate_pose_JPPNet_s2.main()
    #results from model
    with open(r'C:\Users\lenovo\Desktop/try_on/output/pose/val/000183_0.txt','r') as file:
      arr=[int(a) for a in file.readline().split(' ') if a!='']

    x=[arr[16]/2+arr[18]/2,arr[16],arr[24],arr[22],arr[20],arr[26],arr[28],arr[30],arr[4],arr[2],0,arr[6],0,0,arr[16],arr[18]/2+arr[26]/2,arr[24]/2+arr[16]/2,arr[6]/2+arr[26]/2]
    y=[arr[17]/4+arr[19]*0.75,arr[17]/2+arr[15]/2,arr[25],arr[23],arr[21],arr[27],arr[29],arr[31],arr[5],arr[3],0,arr[7],0,0,arr[17]/4+arr[19]*0.75,arr[17]/4+arr[19]*0.75,arr[17]/4+arr[19]*0.75,arr[19]/2+arr[17]/2]
    z=[]
    for i in range(len(x)):
      z.append(x[i])
      z.append(y[i])
      z.append(1)

    #creating json file
    dict={"version": 1.0,"people": [{"face_keypoints": [],"pose_keypoints": z,"hand_right_keypoints": [],"hand_left_keypoints": []}]}
    with open(r"C:\Users\lenovo\Desktop/try_on/custom/test/pose/000183_0_keypoints.json", "w") as outfile:
        json.dump(dict, outfile)

    #..............................human_parsing................................
    evaluate_parsing_JPPNet_s2.main()
    #masking of user Image
    r'''gray = cv2.imread(r'C:\Users\lenovo\Desktop\try_on\custom\test\image-parse/000183_0.png',cv2.IMREAD_GRAYSCALE)
    _, roi = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY)
    cv2.imwrite(r'C:\Users\lenovo\Desktop\try_on\custom\test\image-mask/000183_0.png',roi)'''

if __name__ == "__main__":
    JPPNet_wrapper()
    CPVTON_wrapper("GMM", "GMM", 4, r"C:\Users\lenovo\Desktop\try_on/CP-VTON+/checkpoints/GMM/gmm_final.pth")
    CPVTON_wrapper("TOM", "TOM", 4, r"C:\Users\lenovo\Desktop\try_on/CP-VTON+/checkpoints/TOM/tom_final.pth")