﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Santa.Data.Entities;
using Santa.Logic.Objects;

namespace Santa.Data.Repository
{
    public static class Mapper
    {
        #region Client
        public static Data.Entities.Client MapClient(Logic.Objects.Client logicClient)
        {
            Entities.Client contextClient = new Entities.Client()
            {
                ClientId = logicClient.clientID,
                ClientName = logicClient.clientName,
                Email = logicClient.email,
                Nickname = logicClient.nickname,

                AddressLine1 = logicClient.address.addressLineOne,
                AddressLine2 = logicClient.address.addressLineTwo,
                City = logicClient.address.city,
                State = logicClient.address.state,
                PostalCode = logicClient.address.postalCode,
                Country = logicClient.address.country,

            };
            return contextClient;
        }
        public static Logic.Objects.Client MapClient(Entities.Client contextCharacter)
        {
            Logic.Objects.Client logicClient = new Logic.Objects.Client()
            {
                clientID = contextCharacter.ClientId,
                clientStatusID = contextCharacter.ClientStatusId,
                email = contextCharacter.Email,
                nickname = contextCharacter.Nickname,
                clientName = contextCharacter.ClientName,
                address = new Address
                {
                    addressLineOne = contextCharacter.AddressLine1,
                    addressLineTwo = contextCharacter.AddressLine2,
                    city = contextCharacter.City,
                    country = contextCharacter.Country,
                    state = contextCharacter.State,
                    postalCode = contextCharacter.State
                },

                recipients = contextCharacter.ClientRelationXrefSenderClient.Select(s => s.RecipientClientId).ToList(),
                senders = contextCharacter.ClientRelationXrefRecipientClient.Select(r => r.SenderClientId).ToList()
            };

            return logicClient;
        }
        #endregion

        #region Event

        public static Logic.Objects.Event MapEvent(Entities.EventType contextEventType)
        {
            Logic.Objects.Event logicEvent = new Logic.Objects.Event()
            {
                eventTypeID = contextEventType.EventTypeId,
                eventDescription = contextEventType.EventDescription,
                active = contextEventType.IsActive
            };
            return logicEvent;
        }
        #endregion
        #region Survey
        public static Logic.Objects.Survey MapSurvey(Entities.Survey contextSurvey)
        {
            Logic.Objects.Survey logicSurvey = new Logic.Objects.Survey()
            {
                surveyID = contextSurvey.SurveyId,
                eventTypeID = contextSurvey.EventTypeId,
                surveyDescription = contextSurvey.SurveyDescription,
                active = contextSurvey.IsActive,
                surveyQuestions = contextSurvey.SurveyQuestionXref.Select(Mapper.MapQuestion).ToList()
        };
            return logicSurvey;
        }
        #endregion
        #region Question
        public static Logic.Objects.Question MapQuestion(Entities.SurveyQuestionXref contextSurveyQuestion)
        {
            Logic.Objects.Question logicQuestion = new Question()
            {
                questionID = contextSurveyQuestion.SurveyQuestionId,
                questionText = contextSurveyQuestion.SurveyQuestion.QuestionText,
                isSurveyOptionList = contextSurveyQuestion.SurveyQuestion.IsSurveyOptionList

            };
            return logicQuestion;
        }
        #endregion
    }
}