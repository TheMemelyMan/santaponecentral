import { Component, OnInit, ViewChild } from '@angular/core';
import { MapService } from '../services/utility services/mapper.service';
import { AuthService } from '../auth/auth.service';
import { Profile, ProfileAssignment } from 'src/classes/profile';
import { MessageHistory, ClientMeta, Message, ChatInfoContainer } from 'src/classes/message';
import { EventType } from 'src/classes/eventType';
import { Survey } from 'src/classes/survey';
import { ChatComponent } from '../shared/chat/chat.component';
import { GeneralDataGathererService } from '../services/gathering services/general-data-gatherer.service';
import { ProfileService } from '../services/api services/profile.service';
import { ProfileGatheringService } from '../services/gathering services/profile-gathering.service';
import { MessageService } from '../services/api services/message.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private ProfileGathererService: ProfileGatheringService, 
    private ProfileService: ProfileService,
    private MessageService: MessageService,
    public gatherer: GeneralDataGathererService,
    public auth: AuthService,
    public ApiMapper: MapService) { }

  @ViewChild(ChatComponent) chatComponent: ChatComponent;

  public clientID: string;
  public profile: Profile = new Profile();
  public authProfile: any;

  public selectedRecipient: ProfileAssignment = new ProfileAssignment();
  public selectedHistory: MessageHistory = new MessageHistory();
  public generalHistory: MessageHistory = new MessageHistory();

  public histories: Array<MessageHistory> = [];
  public events: Array<EventType> = [];
  public surveys: Array<Survey> = [];
  public adminRecieverMeta: ClientMeta = new ClientMeta;
  public chatInfoContainer: ChatInfoContainer = new ChatInfoContainer();

  public showOverlay: boolean = false;
  public showChat: boolean = false;

  public softUpdating: boolean = false;
  public refreshing: boolean = false;
  public refreshingHistories: boolean = false;

  public initializing: boolean = true;
  public gettingAllHistories: boolean = false;
  public gettingGeneralHistory: boolean = false;
  public gettingSelectedHistory: boolean = false;
  public gettingProfile: boolean = false;
  public gettingClientID: boolean = false;
  public gettingAssignments: boolean = false;

  public async ngOnInit() {
    // Boolean subscribes
    this.ProfileGathererService.gettingClientID.subscribe((status: boolean) => {
      this.gettingClientID = status;
    });
    this.ProfileGathererService.gettingProfile.subscribe((status: boolean) => {
      this.gettingProfile = status;
    });
    this.ProfileGathererService.gettingGeneralHistory.subscribe((status: boolean) => {
      this.gettingGeneralHistory = status;
    });
    this.ProfileGathererService.gettingUnloadedChatHistories.subscribe((status: boolean) => {
      this.gettingAllHistories = status;
    });
    this.ProfileGathererService.gettingAssignments.subscribe((status: boolean) => {
      this.gettingAssignments = status;
    });

    // ClientID subscribe
    this.ProfileGathererService.clientID.subscribe((id: string) => {
      this.clientID = id;
    });

    // Profile subscribe
    this.ProfileGathererService.profile.subscribe((profile: Profile) => {
      this.profile = profile;
    });

    // Profile Assignment subscribe
    this.ProfileGathererService.profileAssignments.subscribe((assignments: Array<ProfileAssignment>) => {
      this.profile.assignments = assignments;
    });

    // Assignment status subscribe
    this.ProfileGathererService.profile.subscribe((profile: Profile) => {
      this.profile = profile;
    });

    // Auth profile
    this.auth.userProfile$.subscribe(data => {
      this.authProfile = data;
    });

    // Chat histories subscribe
    this.ProfileGathererService.unloadedChatHistories.subscribe((histories: Array<MessageHistory>) => {
      this.histories = histories;
    });

    // General history subscribe
    this.ProfileGathererService.generalHistory.subscribe((generalHistory: MessageHistory) => {
      this.generalHistory = generalHistory;
    });

    // Gatherer subscribes
    this.gatherer.allSurveys.subscribe((surveyArray: Array<Survey>) => {
      this.surveys = surveyArray
    });



    this.initializing =  true;
    await this.ProfileGathererService.getClientIDFromEmail(this.authProfile.email).catch(err => {console.log(err)});
    await this.ProfileGathererService.getProfileByID(this.clientID);
    await this.gatherer.gatherAllSurveys();
    await this.gatherer.gatherAllAssignmentStatuses();

    this.gettingAssignments = true;
    this.ProfileService.getProfileAssignments(this.clientID).subscribe(async (res) => {
      let assignmentArray: Array<ProfileAssignment> = [];
      for(let i = 0; i < res.length; i++)
      {
        assignmentArray.push(this.ApiMapper.mapProfileAssignment(res[i]))
      };
      this.profile.assignments = assignmentArray;
      await this.ProfileGathererService.getUnloadedHistories(this.clientID);
      this.gettingAssignments = false;
    }, err => {
      console.group();
      console.log(err);
      console.groupEnd();
      this.gettingAssignments = false;
    });
    this.gettingGeneralHistory = true;
    this.MessageService.getClientMessageHistoryBySubjectIDAndXrefID(this.clientID ,this.profile.clientID, null).subscribe((res) => {
      this.generalHistory = this.ApiMapper.mapMessageHistory(res);
      this.gettingGeneralHistory = false;
    }, err => {
      this.gettingGeneralHistory = false;
      console.group();
      console.log(err);
      console.groupEnd();
    });
    this.initializing =  false;
  }
  public async showSelectedChat(history: MessageHistory)
  {
    this.showOverlay = true;
    this.chatInfoContainer =
    {
      conversationClientID: this.profile.clientID,
      messageSenderID: this.profile.clientID,
      messageRecieverID: null,
      eventTypeID: history == null ? null : history.eventType.eventTypeID,
      relationshipXrefID: history == null ? null : history.relationXrefID,
      senderIsAdmin: false,
    }
    this.showChat = true;
  }
  public async hideWindow()
  {
    console.log("Doing the thing in hide");
    this.selectedHistory = new MessageHistory();
    this.manualRefreshProfileAssignments(true);
    this.showChat = false;
    this.showOverlay = false;
  }
  public async manualRefreshProfileAssignments(isSoftUpdate: boolean = false)
  {
    this.refreshingHistories = true;
    this.gettingAllHistories = !isSoftUpdate;

    // Gets all the profile assignments
    this.ProfileService.getProfileAssignments(this.clientID).subscribe(async (res) => {
      let assignmentArray: Array<ProfileAssignment> = [];
      for(let i = 0; i < res.length; i++)
      {
        assignmentArray.push(this.ApiMapper.mapProfileAssignment(res[i]))
      };
      this.profile.assignments = assignmentArray;
      await this.ProfileGathererService.getUnloadedHistories(this.clientID, true);
      this.gettingAllHistories = false;
      this.refreshingHistories = false;
    }, err => {
      console.group();
      console.log(err);
      console.groupEnd();
      this.gettingAssignments = false;
    });

    await this.ProfileGathererService.gatherGeneralHistory(this.clientID, this.profile.clientID, true);
  }
}
