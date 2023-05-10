import cv2
import numpy as np

from libs.util import ImageChunker
from libs.pconv_model import PConvUnet

from copy import deepcopy


def inpaint_by_model(img, input_mask):
    print('load model...')
    
    model = PConvUnet(vgg_weights=None, inference_only=True)
    model.load('./model/pconv_imagenet.h5', train_bn=False)

    chunker = ImageChunker(512, 512, 30)

    img_masked = img.copy()

    input_img = img_masked.copy()
    input_img = input_img.astype(np.float32) / 255.
    input_mask = input_mask.astype(np.float32) / 255.

    print('processing...')

    chunked_imgs = chunker.dimension_preprocess(deepcopy(input_img))
    chunked_masks = chunker.dimension_preprocess(deepcopy(input_mask))

    # for i, im in enumerate(chunked_imgs):
    #   cv2.imshow('im %s' % i, im)
    #   cv2.imshow('mk %s' % i, chunked_masks[i])

    pred_imgs = model.predict([chunked_imgs, chunked_masks])
    result_img = chunker.dimension_postprocess(pred_imgs, input_img)

    print('completed!')
    
    result_img = result_img.astype(np.float32) * 255.
    cv2.imwrite("./img/result.jpg", result_img)


# test_model(test_img, test_mask)