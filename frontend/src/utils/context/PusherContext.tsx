import Pusher from 'pusher-js';

export class PusherManager {
  public static isConnected: boolean = false;
  public static pusher: Pusher | null = null;

  public static connectToPusher(): void {
    if (!this.isConnected) {
      this.pusher = new Pusher('00806514f90cf476dcd8', {
        cluster: 'ap1',
      });

      this.isConnected = true;
    }
  }

  public static disconnectFromPusher(): void {
    if (this.isConnected && this.pusher) {
      this.pusher.disconnect();
      this.isConnected = false;
    }
  }

  public static subscribeToEvent(channelId: string, eventName: string, callback: Function): void {
    if (this.isConnected && this.pusher) {
      this.pusher.subscribe(channelId).bind(eventName, callback);
    }
  }
}

// // Sử dụng PusherManager
// const pusherManager = new PusherManager();
// pusherManager.connectToPusher();
// // ...
// // Thực hiện công việc với kết nối Pusher đã có
// // ...
// pusherManager.disconnectFromPusher();

