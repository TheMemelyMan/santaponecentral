import { Component, OnInit} from '@angular/core';
import { SantaApiGetService, SantaApiPutService, SantaApiPostService, SantaApiDeleteService } from '../services/santa-api.service';
import { Tag } from 'src/classes/tag';
import { MapService } from '../services/mapper.service';
import { Question, Survey } from 'src/classes/survey';
import { EventType } from 'src/classes/eventType';
import { GathererService } from '../services/gatherer.service';
import { TagControlComponent } from './tag-control/tag-control.component';
import { Client } from 'src/classes/client';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-admin-control',
  templateUrl: './admin-control.component.html',
  styleUrls: ['./admin-control.component.css']
})
export class AdminControlComponent implements OnInit
{

  constructor(public auth: AuthService,
    public SantaApiGet: SantaApiGetService,
    public SantaApiPut: SantaApiPutService,
    public SantaApiPost: SantaApiPostService,
    public SantaApiDelete: SantaApiDeleteService,
    public gatherer: GathererService,
    public ApiMapper: MapService) { }

  public profile: any;
  public isDev: boolean;

  public allTags: Array<Tag> = [];
  public allEvents: Array<EventType> = [];
  public allSurveys: Array<Survey> = [];
  public allQuestions: Array<Question> = [];
  public allClients: Array<Client> = [];

  public tagControlSelected: boolean = false;
  public eventControlSelected: boolean = false;
  public surveyControlSelected: boolean = false;
  public questionControlSelected: boolean = false;
  public autoAssignControlSelected: boolean = false;

  async ngOnInit() {
    this.allTags = [];
    this.allClients = [];
    this.allEvents = [];
    this.allQuestions = [];
    this.allSurveys = [];

    this.gatherer.allTags.subscribe((tagArray: Array<Tag>) => {
      this.allTags = tagArray;
    });
    this.gatherer.allEvents.subscribe((eventArray: Array<EventType>) => {
      this.allEvents = eventArray;
    });
    this.gatherer.allSurveys.subscribe((surveyArray: Array<Survey>) => {
      this.allSurveys = surveyArray;
    });
    this.gatherer.allQuestions.subscribe((questionArray: Array<Question>) => {
      this.allQuestions = questionArray;
    });
    this.gatherer.allTruncatedClients.subscribe((clients: Array<Client>) => {
      this.allClients = clients;
    });

    // Auth
    this.auth.userProfile$.subscribe(data => {
      this.profile = data;
    });
    this.auth.isDev.subscribe((status: boolean) => {
      this.isDev = status;
    });
    await this.gatherer.gatherAllEvents();
    await this.gatherer.gatherAllSurveys();
    await this.gatherer.gatherAllQuestions();
  }
}
