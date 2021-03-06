import { Injectable } from '@angular/core';
import { SantaApiGetService, YuleLogService } from './santa-api.service';
import { MapService } from './mapper.service';
import { AssignmentStatus, Client, HQClient } from 'src/classes/client';
import { Tag } from 'src/classes/tag';
import { Survey, Question } from 'src/classes/survey';
import { EventType } from 'src/classes/eventType';
import { Observable, BehaviorSubject } from 'rxjs';
import { Status } from 'src/classes/status';
import { Message } from 'src/classes/message';
import { Category, YuleLog } from 'src/classes/yuleLogTypes';

@Injectable({
  providedIn: 'root'
})
export class GathererService {

  constructor(private SantaApiGet: SantaApiGetService, private YuleLogService: YuleLogService, private ApiMapper: MapService) { }

  public onSelectedClient: boolean = false;

  /* BEHAVIOR SUBJECTS FOR GATHERING STATUS */
  private _gatheringAllClients: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  get gatheringAllClients()
  {
    return this._gatheringAllClients.asObservable();
  }

  private _gatheringAllTruncatedClients: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  get gatheringAllTruncatedClients()
  {
    return this._gatheringAllTruncatedClients.asObservable();
  }

  private _gatheringAllHQClients: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  get gatheringAllHQClients()
  {
    return this._gatheringAllHQClients.asObservable();
  }

  private _gatheringAllTags: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  get gatheringAllTags()
  {
    return this._gatheringAllTags.asObservable();
  }

  private _gatheringAllSurveys: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  get gatheringAllSurveys()
  {
    return this._gatheringAllSurveys.asObservable();
  }

  private _gatheringAllQuestions: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  get gatheringAllQuestions()
  {
    return this._gatheringAllQuestions.asObservable();
  }

  private _gatheringAllEvents: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  get gatheringAllEvents()
  {
    return this._gatheringAllEvents.asObservable();
  }

  private _gatheringAllStatuses: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  get gatheringAllStatuses()
  {
    return this._gatheringAllStatuses.asObservable();
  }

  private _gatheringAllMessages: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  get gatheringAllMessages()
  {
    return this._gatheringAllMessages.asObservable();
  }

  private _gatheringAllAssignmentsStatuses: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  get gatheringAllAssignmentsStatuses()
  {
    return this._gatheringAllAssignmentsStatuses.asObservable();
  }

  private _gatheringAllCategories: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  get gatheringAllCategories()
  {
    return this._gatheringAllCategories.asObservable();
  }

  private _gatheringAllYuleLogs: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  get gatheringAllYuleLogs()
  {
    return this._gatheringAllYuleLogs.asObservable();
  }

  /* BEHAVIOR SUBJECTS FOR DATA */
  private _allClients: BehaviorSubject<Array<Client>>= new BehaviorSubject([]);
  private _allTruncatedClients: BehaviorSubject<Array<Client>>= new BehaviorSubject([]);
  private _allHQClients: BehaviorSubject<Array<HQClient>>= new BehaviorSubject([]);
  private _allTags: BehaviorSubject<Array<Tag>> = new BehaviorSubject([]);
  private _allSurveys: BehaviorSubject<Array<Survey>> = new BehaviorSubject([]);
  private _allQuestions: BehaviorSubject<Array<Question>> = new BehaviorSubject([]);
  private _allEvents: BehaviorSubject<Array<EventType>> = new BehaviorSubject([]);
  private _allStatuses: BehaviorSubject<Array<Status>> = new BehaviorSubject([]);
  private _allMessages: BehaviorSubject<Array<Message>> = new BehaviorSubject([]);
  private _allAssignmentStatuses: BehaviorSubject<Array<AssignmentStatus>> = new BehaviorSubject([]);
  private _allCategories: BehaviorSubject<Array<Category>> = new BehaviorSubject([]);
  private _allYuleLogs: BehaviorSubject<Array<YuleLog>> = new BehaviorSubject([]);



  get allClients()
  {
    return this._allClients.asObservable();
  }
  private updateAllClient(clientArray: Array<Client>)
  {
    this._allClients.next(clientArray);
  }

  get allTruncatedClients()
  {
    return this._allTruncatedClients.asObservable();
  }
  private updateAllTruncatedClient(clientArray: Array<Client>)
  {
    this._allTruncatedClients.next(clientArray);
  }

  get allHQClients()
  {
    return this._allHQClients.asObservable();
  }
  private updateAllHQClient(clientArray: Array<HQClient>)
  {
    this._allHQClients.next(clientArray);
  }

  get allTags()
  {
    return this._allTags.asObservable();
  }
  private updateAllTags(tagArray: Array<Tag>)
  {
    this._allTags.next(tagArray);
  }

  get allSurveys()
  {
    return this._allSurveys.asObservable();
  }
  private updateAllSurveys(surveyArray: Array<Survey>)
  {
    this._allSurveys.next(surveyArray);
  }

  get allQuestions()
  {
    return this._allQuestions.asObservable();
  }
  private updateAllQuestions(questionArray: Array<Question>)
  {
    this._allQuestions.next(questionArray);
  }

  get allEvents()
  {
    return this._allEvents.asObservable();
  }
  private updateAllEvents(eventArray: Array<EventType>)
  {
    this._allEvents.next(eventArray);
  }

  get allStatuses()
  {
    return this._allStatuses.asObservable();
  }
  private updateAllStatuses(statusArray: Array<Status>)
  {
    this._allStatuses.next(statusArray);
  }

  get allMessages()
  {
    return this._allMessages.asObservable();
  }
  private updateAllMessages(messageArray: Array<Message>)
  {
    this._allMessages.next(messageArray);
  }

  get allAssignmentStatuses()
  {
    return this._allAssignmentStatuses.asObservable();
  }
  private updateAllAssignmentStatuses(assignmentStatusArray: Array<AssignmentStatus>)
  {
    this._allAssignmentStatuses.next(assignmentStatusArray);
  }

  get allCategories()
  {
    return this._allCategories.asObservable();
  }
  private updateAllCategories(categoryArray: Array<Category>)
  {
    this._allCategories.next(categoryArray);
  }

  get allYuleLogs()
  {
    return this._allYuleLogs.asObservable();
  }
  private updateAllYuleLogs(logArray: Array<YuleLog>)
  {
    this._allYuleLogs.next(logArray);
  }

  /* GATHERING METHODS */
  public async gatherAllClients()
  {
    this._gatheringAllClients.next(true);

    let clientList: Array<Client> = []

    var res = await this.SantaApiGet.getAllClients().toPromise().catch(err => {
      console.group()
      console.log("Something went wrong gathering all clients in the gatherer");
      console.log(err);
      console.groupEnd();
    });


    for(let i = 0; i < res.length; i++)
    {
      clientList.push(this.ApiMapper.mapClient(res[i]));
    }
    this.updateAllClient(clientList);
    this._gatheringAllClients.next(false);
  }

  public async gatherAllTruncatedClients()
  {
    this._gatheringAllTruncatedClients.next(true);

    let clientList: Array<Client> = []

    var res = await this.SantaApiGet.getAllTruncatedClients().toPromise().catch(err => {
      console.group()
      console.log("Something went wrong gathering all clients in the gatherer");
      console.log(err);
      console.groupEnd();
    });


    for(let i = 0; i < res.length; i++)
    {
      clientList.push(this.ApiMapper.mapClient(res[i]));
    }
    this.updateAllTruncatedClient(clientList);
    this._gatheringAllTruncatedClients.next(false);
  }

  public async gatherAllHQClients()
  {
    this._gatheringAllHQClients.next(true);

    let clientList: Array<HQClient> = []

    var res = await this.SantaApiGet.getAllHQClients().toPromise().catch(err => {
      console.group()
      console.log("Something went wrong gathering all clients in the gatherer");
      console.log(err);
      console.groupEnd();
    });


    for(let i = 0; i < res.length; i++)
    {
      clientList.push(this.ApiMapper.mapHQClient(res[i]));
    }
    this.updateAllHQClient(clientList);
    this._gatheringAllHQClients.next(false);
  }

  public async gatherAllTags()
  {
    this._gatheringAllTags.next(true);
    this.updateAllTags([])
    let tagList: Array<Tag> = []

    var res = await this.SantaApiGet.getAllTags().toPromise().catch(err => {
      console.group()
      console.log("Something went wrong gathering all tags in the gatherer");
      console.log(err);
      console.groupEnd();
    });

    for(let i = 0; i < res.length; i++)
    {
      tagList.push(this.ApiMapper.mapTag(res[i]));
    }
    this.updateAllTags(tagList);
    this._gatheringAllTags.next(false);
  }
  public async gatherAllSurveys()
  {
    this._gatheringAllSurveys.next(true);
    this.updateAllSurveys([]);
    let surveyList: Array<Survey> = []

    var res = await this.SantaApiGet.getAllSurveys().toPromise().catch(err => {
      console.group()
      console.log("Something went wrong gathering all surveys in the gatherer");
      console.log(err);
      console.groupEnd();
    });

    for(let i = 0; i < res.length; i++)
    {
      surveyList.push(this.ApiMapper.mapSurvey(res[i]));
    }
    this.updateAllSurveys(surveyList);
    this._gatheringAllSurveys.next(false);
  }
  public async gatherAllQuestions()
  {
    this._gatheringAllQuestions.next(true);
    this.updateAllQuestions([]);
    let questionList: Array<Question> = []

    var res = await this.SantaApiGet.getAllSurveyQuestions().toPromise().catch(err => {
      console.group()
      console.log("Something went wrong gathering all questions in the gatherer");
      console.log(err);
      console.groupEnd();
    });

    for(let i = 0; i < res.length; i++)
    {
      questionList.push(this.ApiMapper.mapQuestion(res[i]));
    }
    this.updateAllQuestions(questionList);
    this._gatheringAllQuestions.next(false);
  }
  public async gatherAllEvents()
  {
    this._gatheringAllEvents.next(true);
    this.updateAllEvents([])
    let eventList: Array<EventType> = []

    var res = await this.SantaApiGet.getAllEvents().toPromise().catch(err => {
      console.group()
      console.log("Something went wrong gathering all events in the gatherer");
      console.log(err);
      console.groupEnd();
    });

    for(let i = 0; i < res.length; i++)
    {
      eventList.push(this.ApiMapper.mapEvent(res[i]));
    }
    this.updateAllEvents(eventList);
    this._gatheringAllEvents.next(false);
  }
  public async gatherAllStatuses()
  {
    this._gatheringAllStatuses.next(true);
    this.updateAllStatuses([])
    let statusList: Array<Status> = []

    var res = await this.SantaApiGet.getAllStatuses().toPromise().catch(err => {
      console.group()
      console.log("Something went wrong gathering all statuses in the gatherer");
      console.log(err);
      console.groupEnd();
    });

    for(let i = 0; i < res.length; i++)
    {
      statusList.push(this.ApiMapper.mapStatus(res[i]));
    }
    this.updateAllStatuses(statusList);
    this._gatheringAllStatuses.next(false);
  }
  public async gatherAllMessages()
  {
    this._gatheringAllMessages.next(true);
    this.updateAllMessages([])
    let messageList: Array<Message> = []

    var res = await this.SantaApiGet.getAllMessages().toPromise().catch(err => {
      console.group()
      console.log("Something went wrong gathering all messages in the gatherer");
      console.log(err);
      console.groupEnd();;
    });

    for(let i = 0; i < res.length; i++)
    {
      messageList.push(this.ApiMapper.mapMessage(res[i]));
    }
    this.updateAllMessages(messageList);
    this._gatheringAllMessages.next(false);
  }
  public async gatherAllAssignmentStatuses()
  {
    this._gatheringAllAssignmentsStatuses.next(true);
    this.updateAllAssignmentStatuses([])
    let assignmentStatusList: Array<AssignmentStatus> = []

    var res = await this.SantaApiGet.getAllAssignmentStatuses().toPromise().catch(err => {
      console.group()
      console.log("Something went wrong gathering all assignment statuses in the gatherer");
      console.log(err);
      console.groupEnd();
    });

    for(let i = 0; i < res.length; i++)
    {
      assignmentStatusList.push(this.ApiMapper.mapAssignmentStatus(res[i]));
    }
    this.updateAllAssignmentStatuses(assignmentStatusList);
    this._gatheringAllAssignmentsStatuses.next(false);
  }
  public async gatherAllCategories()
  {
    this._gatheringAllCategories.next(true);
    this.updateAllCategories([])
    let categoryList: Array<Category> = []

    var res = await this.YuleLogService.getAllCategories().toPromise().catch(err => {
      console.group()
      console.log("Something went wrong gathering all categories in the gatherer");
      console.log(err);
      console.groupEnd();
    });

    for(let i = 0; i < res.length; i++)
    {
      categoryList.push(this.ApiMapper.mapCategory(res[i]));
    }
    this.updateAllCategories(categoryList);
    this._gatheringAllCategories.next(false);
  }
  public async gatherAllYuleLogs()
  {
    this._gatheringAllYuleLogs.next(true);
    this.updateAllYuleLogs([])
    let yuleLogList: Array<YuleLog> = []

    var res = await this.YuleLogService.getAllLogs().toPromise().catch(err => {
      console.group()
      console.log("Something went wrong gathering all logs in the gatherer");
      console.log(err);
      console.groupEnd();
    });

    for(let i = 0; i < res.length; i++)
    {
      yuleLogList.push(this.ApiMapper.mapYuleLog(res[i]));
    }
    this.updateAllYuleLogs(yuleLogList);
    this._gatheringAllYuleLogs.next(false);
  }

  // Utility methods
  public async allGather()
  {
    await this.gatherAllClients();
    await this.gatherAllEvents();
    await this.gatherAllQuestions();
    await this.gatherAllSurveys();
    await this.gatherAllTags();
    await this.gatherAllStatuses();
    await this.gatherAllAssignmentStatuses();
  }
  public clearAll()
  {
    this.updateAllClient([]);
    this.updateAllEvents([]);
    this.updateAllQuestions([]);
    this.updateAllSurveys([]);
    this.updateAllTags([]);
    this.updateAllStatuses([]);
    this.updateAllAssignmentStatuses([]);
    this.updateAllMessages([]);
  }
}
