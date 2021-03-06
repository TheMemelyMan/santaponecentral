import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MapService } from 'src/app/services/mapper.service';
import { SantaApiGetService, SantaApiPostService, SantaApiPutService } from 'src/app/services/santa-api.service';
import { ChatInfoContainer, ClientMeta, MessageHistory } from 'src/classes/message';
import { MessageApiResponse } from 'src/classes/responseTypes';
import { ContactPanelComponent } from '../contact-panel/contact-panel.component';
import { InputControlComponent } from '../input-control/input-control.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnChanges {

  constructor(public mapper: MapService,
    public SantaApiGet: SantaApiGetService,
    public SantaApiPut: SantaApiPutService,
    public SantaApiPost: SantaApiPostService) { }

  @Input() chatInfoContainer: ChatInfoContainer = new ChatInfoContainer();
  @Input() inputDisabled: boolean;
  @Input() showChatLoading: boolean = false;
  @Input() showChatActionProgressBar: boolean;
  @Input() chatRefreshing: boolean = false;
  @Input() showControlButton: boolean = false;

  @Output() historyUpdatedEvent: EventEmitter<MessageHistory> = new EventEmitter<MessageHistory>();
  @Output() manualRefreshClickedEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() sendClickedEvent: EventEmitter<MessageApiResponse> = new EventEmitter<MessageApiResponse>();
  @Output() readAllClickedEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() openAgentControlEvent: EventEmitter<ClientMeta> = new EventEmitter<ClientMeta>();

  @ViewChild(ContactPanelComponent) chatWindowComponent: ContactPanelComponent;
  @ViewChild(InputControlComponent) inputComponent: InputControlComponent;

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges) {
    if(changes.chatInfoContainer && !changes.chatInfoContainer.isFirstChange())
    {
      setTimeout(()=> this.manualRefreshChat(false) ,0);
    }
  }
  emitHistoryUpdatedEvent(messageHistoryEvent: MessageHistory)
  {
    this.historyUpdatedEvent.emit(messageHistoryEvent);
  }
  emitManualRefresh(event: boolean)
  {
    this.manualRefreshClickedEvent.emit(event);
  }
  emitSend(messageApiResponseEvent: MessageApiResponse)
  {
    this.sendClickedEvent.emit(messageApiResponseEvent);
    this.send(messageApiResponseEvent);
  }
  emitReadAllClicked()
  {
    this.readAllClickedEvent.emit(true);
    this.readAll();
  }
  emitAgentControlEvent(meta: ClientMeta)
  {
    this.openAgentControlEvent.emit(meta);
  }
  manualRefreshChat(isSoftRefresh: boolean = false)
  {
    this.chatWindowComponent.manualRefreshChat(isSoftRefresh);
  }
  refreshStatusAction(refreshEvent: boolean)
  {
    setTimeout(()=> this.chatRefreshing = refreshEvent ,0);
    if(this.showChatActionProgressBar && refreshEvent == false)
    {
      this.showChatActionProgressBar = false;
    }
  }
  loadStatusAction(loadEvent: boolean)
  {
    setTimeout(()=> this.showChatLoading = loadEvent ,0);
  }
  send(messageApiResponseEvent: MessageApiResponse)
  {
    this.showChatActionProgressBar = true;
    this.inputDisabled = true;

    this.SantaApiPost.postMessage(messageApiResponseEvent).subscribe((res) => {
      this.chatWindowComponent.manualRefreshChat(true);
      this.inputComponent.clearForm();
      this.inputDisabled = false;
    }, err => {
      this.inputDisabled = false;
      console.group();
      console.log("An error has occured sending the message");
      console.log(err);
      console.groupEnd();
    });
  }
  readAll()
  {

  }
}
