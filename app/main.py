from djitellopy import Tello
from threading import Thread
import cv2
import time
import torch

class App:
    def __init__(self):
        self.tello = Tello()
        self.model = None
        self.keepRecording = False
        self.frameRead = None
        self.videoProcessor = None

    def run(self):
        try:
            self.keepRecording = True

            self.load_model()

            self.tello.connect()
            self.tello.streamon()

            self.prepare_process_video()

            while True:
                k = cv2.waitKey(1) & 0xFF
                # press 'q' to exit
                if k == ord('q'):
                    break

        except Exception as e:
            print(e)
        finally:
            self.tello.land()
            self.keepRecording = False
            self.frameRead = False

            if self.videoProcessor:
                self.videoProcessor.join()

    def load_model(self):
        self.model = torch.load("tmp/model.pth")

    def prepare_process_video(self):
        self.frameRead = self.tello.get_frame_read()

        self.videoProcessor = Thread(target=self.process_video)
        self.videoProcessor.start()

    def process_video(self):
        height, width, _ = self.frameRead.frame.shape

        while self.keepRecording:
            frame = cv2.resize(self.frameRead.frame, (224, 224))
            frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            frame = torch.tensor(frame, dtype=torch.float32).permute(2, 0, 1)
            frame = frame.unsqueeze(0)

            with torch.no_grad():
                output = self.model(frame)

            print("Output: ", output)

            time.sleep(1 / 30)

if __name__ == "__main__":
    app = App()
    app.run()
