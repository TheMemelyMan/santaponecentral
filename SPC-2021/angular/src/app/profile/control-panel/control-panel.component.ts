import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ProfileAssignment, Profile } from 'src/classes/profile';
import { MessageHistory, ClientMeta } from 'src/classes/message';
import { SantaApiGetService } from 'src/app/services/santa-api.service';
import { AuthService } from 'src/app/auth/auth.service';
import { MapService } from 'src/app/services/mapper.service';
import { ProfileService } from 'src/app/services/profile.service';
import { Survey, SurveyResponse } from 'src/classes/survey';
import { SelectedRecipientComponent } from '../selected-recipient/selected-recipient.component';
import { AssignmentCSVModel, ExporterService } from 'src/app/services/exporter.service';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent implements OnInit {

  constructor(public ApiMapper: MapService,
    public SantaApiGet: SantaApiGetService,
    public auth: AuthService,
    public profileService: ProfileService,
    public exporter: ExporterService) { }

  @Input() gettingAllHistories: boolean;
  @Input() gettingGeneralHistory: boolean;
  @Input() gettingSelectedHistory: boolean;
  @Input() gettingProfile: boolean;
  @Input() refreshing: boolean;

  @Input() loading: boolean;
  @Input() doneGettingInfo: boolean;
  @Input() histories: Array<MessageHistory> = []
  @Input() generalHistory: MessageHistory = new MessageHistory();
  @Input() profile: Profile;
  @Input() surveys: Array<Survey>;

  @Output() chatClickedEvent: EventEmitter<MessageHistory> = new EventEmitter<MessageHistory>();
  @Output() refreshClientAssignmentsEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild(SelectedRecipientComponent) selectedRecipientComponent: SelectedRecipientComponent;


  public selectedRecipient: ProfileAssignment;

  public isAdmin: boolean;
  public initializing: boolean;

  public showRecipientData: boolean = false;
  public actionTaken: boolean = false;


  ngOnInit(): void {
    this.initializing = true;
    this.auth.isAdmin.subscribe((admin: boolean) => {
      this.isAdmin = admin;
      this.initializing = false;
    });
  }
  // Event is from the chat histories component, and contains {meta: ClientMeta, event: EventType}
  public showRecipientCard(eventInformation)
  {
    this.selectedRecipient = this.getProfileAssignmentByMetaAndEventID(eventInformation.meta, eventInformation.event.eventTypeID);
    this.showRecipientData = true;
  }
  public hideRecipientCard()
  {
    if(!this.selectedRecipientComponent.clickAwayLocked)
    {
      this.selectedRecipient = undefined;
      this.showRecipientData = false;
    }

    if(this.actionTaken)
    {
      this.refreshClientAssignmentsEvent.emit(this.actionTaken);
      this.actionTaken = false;
    }
  }
  public emitRefresh()
  {
    this.refreshClientAssignmentsEvent.emit(true);
  }
  public getProfileAssignmentByMetaAndEventID(meta: ClientMeta, eventID)
  {
    let ProfileAssignment = this.profile.assignments.find((recipient: ProfileAssignment) => {
      return recipient.recipientClient.clientID == meta.clientID && recipient.recipientEvent.eventTypeID == eventID;
    });
    return ProfileAssignment;
  }
  public async historySelected(history: MessageHistory)
  {
    this.chatClickedEvent.emit(history);
  }
  public setActionTaken(event: boolean)
  {
    this.actionTaken = event;
  }
  public exportCSVOfAssignments()
  {
    let downloadModel: Array<AssignmentCSVModel> = this.convertToAssignmentCSVModel();

    this.exporter.downloadFile(downloadModel, this.profile.clientNickname + "'s Assignments");


  }
  public convertToAssignmentCSVModel() : Array<AssignmentCSVModel>
  {
    let dataArray: Array<AssignmentCSVModel> = []

    this.profile.assignments.forEach((assignment: ProfileAssignment) => {
      let spaghettiAnswer: SurveyResponse = assignment.responses.find((response: SurveyResponse) => {return (response.surveyQuestion.questionID == "ab44ac50-60fe-4e3f-b9b8-eeb799d334b9" || response.surveyQuestion.questionID == "9d1cae7b-d8a6-4130-ae03-2a6fdb2902dd") && response.responseEvent.eventTypeID == assignment.recipientEvent.eventTypeID})
      dataArray.push({
        Nickname: assignment.recipientClient.clientNickname,
        'Real Name': assignment.recipientClient.clientName,
        Event: assignment.recipientEvent.eventDescription,
        Status: assignment.assignmentStatus.assignmentStatusName,
        'Address Line 1': assignment.address.addressLineOne,
        'Address Line 2': assignment.address.addressLineTwo,
        City: assignment.address.city,
        State: assignment.address.state,
        Country: assignment.address.country,
        'Postal Code': assignment.address.postalCode,
        'Spaghetti Answer': spaghettiAnswer != undefined ? spaghettiAnswer.responseText : "No spaghetti answer for this agent exists"
      });
    });
    return dataArray;
  }
}
