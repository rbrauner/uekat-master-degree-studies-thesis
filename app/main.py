from djitellopy import Tello
import torch

class App:
    def __init__(self):
        self.tello = Tello()
        self.model = None

    def run(self):
        try:
            self.load_model()

            self.tello.connect()
            self.tello.streamon()
        except Exception as e:
            print(e)
        finally:
            self.tello.land()

    def load_model(self):
        self.model = torch.load("tmp/model.pth")

if __name__ == "__main__":
    app = App()
    app.run()
