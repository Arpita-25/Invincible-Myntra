import os
def f_write():
    save_path=r'C:\Users\lenovo\Desktop/try_on/custom'
    file_name1='test_pairs.txt'
    file_name2='t_p.txt'
    completeName1=os.path.join(save_path,file_name1)
    file1=open(completeName1,"w")
    file1.write('/image/000183_0.jpg')
    file1.close()
    completeName2=os.path.join(save_path,file_name2)
    file2=open(completeName2,"w")
    file2.write('000183_0.jpg 000560_0.jpg')
    file2.close()
