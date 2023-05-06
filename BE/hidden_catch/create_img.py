from wx import *
import cv2
import numpy as np


def normalize_size(src, dst, ref, width = 400, height = 600):
    
    w = src.shape[1]
    h = src.shape[0]
    dst_rate = height / width 
    rate = h / w              

    if rate < dst_rate: 
        src = cv2.resize(src, (width, int(width * rate)))
        ref = cv2.resize(ref, (width, int(width * rate)))
        dst = cv2.resize(dst, (width, int(width * rate)))
    else:               
        src = cv2.resize(src, (int(height / rate), height))
        ref = cv2.resize(ref, (int(height / rate), height))
        dst = cv2.resize(dst, (int(height/rate)  , height))
    return src, dst, ref


def get_morphological_edge(src):
    imgBlur = cv2.cvtColor(src, cv2.COLOR_BGR2GRAY) 
    thresh = cv2.threshold(imgBlur, 128, 255, cv2.THRESH_BINARY)[1]
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (5,5))
    dilate = cv2.morphologyEx(thresh, cv2.MORPH_DILATE, kernel)
    diff = cv2.absdiff(dilate, thresh)
   
    edges = diff

    return edges


def get_contours(edge, imgContour):
    contours, hierarchy =cv2.findContours(edge, cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)
    min_area = 400
    max_area = edge.shape[0] * edge.shape[1] / 8

    ptsCandidate = []
    approxCandidate = []

    for cnt in contours:
        if len(cnt) == 0: continue
        area = cv2.contourArea(cnt)
        if  area < min_area: continue  
        cv2.drawContours(imgContour, cnt, -1, (255,0,0), 3)
        peri = cv2.arcLength(cnt, True)     
        epsilon = 0.02 * peri
        approx = cv2.approxPolyDP(cnt, epsilon, True)
        x, y, w, h = cv2.boundingRect(approx)
        if w*h > max_area: continue     

        ptsCandidate.append([x,y,x+w,y+h])
        approxCandidate.append(approx)
    return ptsCandidate,approxCandidate


def quiz(ptsCandidate, approxCandidate, num, imgMask, ref):
    pts = []
    approxs = []
    indexes = np.random.permutation(np.arange(len(ptsCandidate)))    
    cnt = 0
    min_distance = 10

    for i in indexes:
        if cnt >= num: break

        x1 = ptsCandidate[i][0]
        y1 = ptsCandidate[i][1]
        x2 = ptsCandidate[i][2]
        y2 = ptsCandidate[i][3]

        TOO_CLOSE = False
        for j in pts:
            r1 = np.sqrt((x1-x2)**2 + (y1-y2)**2)/2             
            r2 = np.sqrt((j[0]-j[2])**2 + (j[1]-j[3])**2)/2     

            c1 = [(x1+x2)/2, (y1+y2)/2]
            c2 = [(j[0]+j[2])/2, (j[1]+j[3])/2]

            d = np.sqrt((c1[0]-c2[0])**2 + (c1[1]-c2[1])**2)
            if  d  < r1 + r2 +  min_distance:
                TOO_CLOSE = True
                break

        if TOO_CLOSE == True: continue

        approxCandidate[i] = np.int32([approxCandidate[i]])  
        cv2.fillPoly(imgMask, approxCandidate[i], (0,0,0))
        cv2.fillPoly(ref , approxCandidate[i], (255,255,255))

        pts.append([x1,y1,x2,y2])
        approxs.append(approxCandidate[i])
        cnt += 1

    return pts


def centering_image(src, dst, ref, width = 400, height = 600):
    w = src.shape[1]
    h = src.shape[0]

    rate = h/w
    dst_rate = height / width

    src_output = np.zeros((600, 400, 3), dtype = np.uint8)
    ref_output = np.zeros((600, 400, 3), dtype = np.uint8)
    dst_output = np.zeros((600, 400, 3), dtype = np.uint8)

    x = (width +1 - w) // 2           
    y = (height+1 - h) // 2            


    if rate < dst_rate: 
        src_output[y:height - y + h % 2, x:width - x] = src[:, :]
        ref_output[y:height - y + h % 2, x:width - x] = ref[:, :]
        dst_output[y:height - y + h % 2, x:width - x] = dst[:, :]
    else:      
        src_output[y:height - y, x:width - x + w % 2] = src[:, :]
        ref_output[y:height - y, x:width - x + w % 2] = ref[:, :]
        dst_output[y:height - y, x:width - x + w % 2] = dst[:, :]

    t = (x,y)

    return src_output, dst_output,  ref_output, t


def get_pts_center(pts):
    pts_c = []
    for pts_i in pts:
        pts_c.append( ((pts_i[0]+pts_i[2])//2, (pts_i[1]+pts_i[3])//2)  )

    return pts_c


def create_wx_bitmap(cv2_image):

    height, width = cv2_image.shape[:2]

    info = np.iinfo(cv2_image.dtype) 
    data = cv2_image.astype(np.float64) / info.max 
    data = 255 * data  
    cv2_image = data.astype(np.uint8)

    cv2_image_rgb = cv2.cvtColor(cv2_image, cv2.COLOR_BGR2RGB)
    return Bitmap.FromBuffer(width, height, cv2_image_rgb)


def get_next_quiz(NextImagePath):
    src = cv2.imread(NextImagePath)         
    dst = src.copy() 
    ref = src.copy()                  

    src, dst, ref = normalize_size(src, dst, ref)    

    edges = get_morphological_edge(src)       
    imgContour = src.copy()                
    imgMask = np.full(src.shape[:2], 255, np.uint8)  


    ptsCandidate, approxCandidate = get_contours(edges, imgContour)
    pts = quiz(ptsCandidate, approxCandidate, 10, imgMask, ref)

    cv2.xphoto.inpaint(ref, imgMask, dst, 0)

    src, dst, ref , t = centering_image(src, dst, ref)
    img = np.hstack([src,dst,ref])

    return img, pts, t

   

answerPoints = []
image, answerPoints, t = get_next_quiz("./1.png")
pointsCenter = get_pts_center(answerPoints)

print(answerPoints)
print(pointsCenter)

cv2.imshow("test", image)
cv2.waitKey(0)
cv2.destroyAllWindows()
