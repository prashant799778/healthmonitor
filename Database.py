from __future__ import absolute_import
from __future__ import division
from __future__ import print_function
from preprocess import preprocesses
import sys
import tensorflow as tf
from scipy import misc
from classifier import training
import cv2
import facenet
import detect_face
import numpy as np
import MySQLdb
import os,shutil
import time
import pickle
from flask import Flask,request

app = Flask(__name__)

connection = MySQLdb.connect(host="localhost",user="root",password="",db="fudb")

faceCascade=cv2.CascadeClassifier('haarcascade_frontalface_default.xml');

@app.route('/dataAdd', methods=['POST'])
def dataAdd():
	try:
		input_datadir = "./train_img"
		output_datadir = "./pre_img"
		modeldir = './model/20170511-185253.pb'
		classifier_filename = './class/classifier.pkl'
		# ID = request.form['Id']
		name = request.form['Name']
		mobile = request.form['Mobile']

		if name and mobile:

			cursorr = connection.cursor()
			query="SELECT * FROM user WHERE Mobile = "+str(mobile)
			cursorr.execute(query)
			data = cursorr.fetchall()
			print(data)
			connection.commit()
			cursorr.close()

			if(len(data)<=0):
				path = str(input_datadir) + "/"+str(name)+"/"

				video_capture = cv2.VideoCapture(0)

				if not video_capture.isOpened():
				    raise IOError("Cannot open webcam")

				sampleNum=0

				while True:
				    # Capture frame-by-frame
				    ret, frame = video_capture.read()

				    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

				    faces = faceCascade.detectMultiScale(
				        gray,
				        scaleFactor=1.3,
				        minNeighbors=5,
				        minSize=(30, 30),
				        flags=cv2.CASCADE_SCALE_IMAGE
				    )

				    if not os.path.exists(path):
				    	os.makedirs(path)

				    for (x, y, w, h) in faces:
				    	sampleNum=sampleNum+1;
				    	cv2.imwrite(str(path)+"User."+str(name.split(" ")[0])+"."+str(sampleNum)+".jpg",frame)
				    	image = cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 2)

				    cv2.waitKey(100);
				    cv2.imshow("Face",frame);
				    cv2.waitKey(1);

				    if(sampleNum>20):
				    	break;

				video_capture.release()

				cursor = connection.cursor()

				query="INSERT INTO user(Name,Mobile,Image,Processed) Values('"+str(name)+"','"+str(mobile)+"','"+str(input_datadir)+"','"+str(output_datadir)+"')"
				cursor.execute(query)
				connection.commit()
				cursor.close()

				print("Data Added Successfully")

				for filename in os.listdir(output_datadir):
				    file_path = os.path.join(output_datadir, filename)

				    if os.path.isfile(file_path) or os.path.islink(file_path):
				    	os.unlink(file_path)
				    	print("Files Removed "+str(filename))
				    elif os.path.isdir(file_path):
				    	shutil.rmtree(file_path)
				    	print("Folders Removed "+str(filename))

				obj=preprocesses(input_datadir,output_datadir)
				nrof_images_total,nrof_successfully_aligned=obj.collect_data()

				print('Total number of images: %d' % nrof_images_total)
				print('Number of successfully aligned images: %d' % nrof_successfully_aligned)

				print ("Training Start")
				obj=training(output_datadir,modeldir,classifier_filename)
				get_file=obj.main_train()
				print('Saved classifier model to file "%s"' % get_file)
				# sys.exit("All Done")

				return "Data Added & Model Trained Successfully"
			
			else:

				return "Face Data Already Exits"

	except Exception as e :
		print("Exception--->" + str(e))
		return "Please Check the Code" 

@app.route('/recognizeFace', methods=['GET'])
def recognizeFace():
	try:
		modeldir = './model/20170511-185253.pb'
		classifier_filename = './class/classifier.pkl'
		npy='./npy'
		train_img="./train_img"

		with tf.Graph().as_default():
		    gpu_options = tf.GPUOptions(per_process_gpu_memory_fraction=0.6)
		    sess = tf.Session(config=tf.ConfigProto(gpu_options=gpu_options, log_device_placement=False))
		    with sess.as_default():
		        pnet, rnet, onet = detect_face.create_mtcnn(sess, npy)

		        minsize = 20  # minimum size of face
		        threshold = [0.8, 0.9, 0.9]  # three steps's threshold
		        factor = 0.709  # scale factor
		        margin = 44
		        frame_interval = 3
		        batch_size = 1000
		        image_size = 182
		        input_image_size = 160
		        
		        HumanNames = os.listdir(train_img)
		        HumanNames.sort()

		        print('Loading Modal')
		        facenet.load_model(modeldir)
		        images_placeholder = tf.get_default_graph().get_tensor_by_name("input:0")
		        embeddings = tf.get_default_graph().get_tensor_by_name("embeddings:0")
		        phase_train_placeholder = tf.get_default_graph().get_tensor_by_name("phase_train:0")
		        embedding_size = embeddings.get_shape()[1]


		        classifier_filename_exp = os.path.expanduser(classifier_filename)
		        with open(classifier_filename_exp, 'rb') as infile:
		            (model, class_names) = pickle.load(infile)

		        video_capture = cv2.VideoCapture(0)
		        c = 0


		        print('Start Recognition')
		        prevTime = 0
		        while True:
		            ret, frame = video_capture.read()

		            frame = cv2.resize(frame, (0,0), fx=1, fy=1)    #resize frame (optional)

		            curTime = time.time()+1    # calc fps
		            timeF = frame_interval

		            if (c % timeF == 0):
		                find_results = []

		                if frame.ndim == 2:
		                    frame = facenet.to_rgb(frame)
		                frame = frame[:, :, 0:3]
		                bounding_boxes, _ = detect_face.detect_face(frame, minsize, pnet, rnet, onet, threshold, factor)
		                nrof_faces = bounding_boxes.shape[0]
		                print('Detected_FaceNum: %d' % nrof_faces)

		                if nrof_faces > 0:
		                    det = bounding_boxes[:, 0:4]
		                    img_size = np.asarray(frame.shape)[0:2]

		                    cropped = []
		                    scaled = []
		                    scaled_reshape = []
		                    bb = np.zeros((nrof_faces,4), dtype=np.int32)

		                    for i in range(nrof_faces):
		                        emb_array = np.zeros((1, embedding_size))

		                        bb[i][0] = det[i][0]
		                        bb[i][1] = det[i][1]
		                        bb[i][2] = det[i][2]
		                        bb[i][3] = det[i][3]

		                        # inner exception
		                        if bb[i][0] <= 0 or bb[i][1] <= 0 or bb[i][2] >= len(frame[0]) or bb[i][3] >= len(frame):
		                            print('Face is very close!')
		                            continue

		                        cropped.append(frame[bb[i][1]:bb[i][3], bb[i][0]:bb[i][2], :])
		                        cropped[i] = facenet.flip(cropped[i], False)
		                        scaled.append(misc.imresize(cropped[i], (image_size, image_size), interp='bilinear'))
		                        scaled[i] = cv2.resize(scaled[i], (input_image_size,input_image_size),
		                                               interpolation=cv2.INTER_CUBIC)
		                        scaled[i] = facenet.prewhiten(scaled[i])
		                        scaled_reshape.append(scaled[i].reshape(-1,input_image_size,input_image_size,3))
		                        feed_dict = {images_placeholder: scaled_reshape[i], phase_train_placeholder: False}
		                        emb_array[0, :] = sess.run(embeddings, feed_dict=feed_dict)
		                        predictions = model.predict_proba(emb_array)
		                        print(predictions)
		                        best_class_indices = np.argmax(predictions, axis=1)
		                        best_class_probabilities = predictions[np.arange(len(best_class_indices)), best_class_indices]
		                        # print("predictions")
		                        print(best_class_indices,' with accuracy ',best_class_probabilities)

		                    print(best_class_probabilities)
		                    print(best_class_indices)

		                    for H_i in HumanNames:
		                    	if HumanNames[best_class_indices[0]] == H_i:
		                    		result_names = HumanNames[best_class_indices[0]]

		                    return {"message":"Successfully Recognized","result":result_names,"status":"true"}
		                    break
		                else:
		                    print('Alignment Failure')
		                    return "Alignment Failure"
		            # c+=1
		            # cv2.imshow('Video', frame)

		            # if cv2.waitKey(1) & 0xFF == ord('q'):
		            #     break

		        video_capture.release()
		        cv2.destroyAllWindows()

	except Exception as e :
		print("Exception--->" + str(e))
		return "Please Check the Code" 

if __name__ == "__main__":
	app.run(debug=True)