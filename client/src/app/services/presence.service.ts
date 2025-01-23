import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { User } from '../interfaces/user';
import { HubConnection, HubConnectionBuilder, HubConnectionState,  } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class PresenceService {
  hubUrl = environment.hubsUrl;
  private hubConnection?: HubConnection;
  private toastr = inject(ToastrService);
  hubConnectionBuilder: any;
  onlineUsers = signal<string[]>([]);


  createHubConnection(user: User) {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + 'presence', {
        accessTokenFactory: () => user.token
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection?.start().catch(error => console.log(error));

    this.hubConnection?.on('UserIsOnline', username => {
      this.toastr.info(username + ' is online');
    });

    this.hubConnection?.on('UserIsOffline', username => {
      this.toastr.warning(username + ' is offline');
    });  
    
    this.hubConnection.on('GetOnlineUsers', usernames => {
      this.onlineUsers.set(usernames)
    })
    
  }

  stopHubConnection() {
    if (this.hubConnection?.state === HubConnectionState.Connected) {
      this.hubConnection.stop().catch(error => console.log(error))
    }
  }

}
