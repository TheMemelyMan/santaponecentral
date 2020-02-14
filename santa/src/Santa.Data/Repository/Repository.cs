﻿using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Santa.Logic.Interfaces;
using Santa.Logic.Objects;
using Santa.Data.Entities;
using Santa.Data.Repository;

namespace Santa.Data.Repository
{
    public class Repository : IRepository
    {
        private readonly SantaBaseContext santaContext;

        public Repository(SantaBaseContext _context)
        {
            santaContext = _context ?? throw new ArgumentNullException(nameof(_context));
        }
        public Task<Logic.Objects.Client> CreateClientAsync()
        {
            throw new NotImplementedException();
        }

        public Task<Event> CreateEventAsync()
        {
            throw new NotImplementedException();
        }

        public Task<Event> CreateSurveyOptionAsync()
        {
            throw new NotImplementedException();
        }

        public Task<Event> CreateSurveyQuestionAsync()
        {
            throw new NotImplementedException();
        }

        public Task<Event> CreateSurveyResponseAsync()
        {
            throw new NotImplementedException();
        }

        public Task<Logic.Objects.Client> DeleteClientByIDAsync()
        {
            throw new NotImplementedException();
        }

        public Task<Event> DeleteEventByIDAsync()
        {
            throw new NotImplementedException();
        }

        public Task<Event> DeleteSurveyOptionByIDAsync()
        {
            throw new NotImplementedException();
        }

        public Task<Event> DeleteSurveyQuestionByIDAsync()
        {
            throw new NotImplementedException();
        }

        public Task<Event> DeleteSurveyResponseByIDAsync()
        {
            throw new NotImplementedException();
        }

        public List<Logic.Objects.Client> GetAllClients()
        {
            try
            {
                List<Logic.Objects.Client> clientList = new List<Logic.Objects.Client>();
                clientList = santaContext.Client.Select(Mapper.MapClient).ToList();
                return clientList;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public List<Event> GetAllEvents()
        {
            try
            {
                List<Logic.Objects.Event> eventList = new List<Logic.Objects.Event>();
                eventList = santaContext.EventType.Select(Mapper.MapEvent).ToList();
                return eventList;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public Task<Logic.Objects.Client> GetClientByEmailAsync()
        {
            throw new NotImplementedException();
        }

        public async Task<Logic.Objects.Client> GetClientByID(Guid clientId)
        {
            try
            {
                Logic.Objects.Client logicClient = Mapper.MapClient(await santaContext.Client.FirstOrDefaultAsync(c => c.ClientId == clientId));
                return logicClient;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public Task<Event> GetEventByIDAsync()
        {
            throw new NotImplementedException();
        }

        public Task<Event> GetSurveyOptionByIDAsync()
        {
            throw new NotImplementedException();
        }

        public Task<Event> GetSurveyQuestionByIDAsync()
        {
            throw new NotImplementedException();
        }

        public Task<Event> GetSurveyResponseByIDAsync()
        {
            throw new NotImplementedException();
        }

        public Task<Logic.Objects.Client> UpdateClientByIDAsync()
        {
            throw new NotImplementedException();
        }

        public Task<Event> UpdateEventByIDAsync()
        {
            throw new NotImplementedException();
        }

        public Task<Event> UpdateSurveyOptionByIDAsync()
        {
            throw new NotImplementedException();
        }

        public Task<Event> UpdateSurveyQuestionByIDAsync()
        {
            throw new NotImplementedException();
        }

        public Task<Event> UpdateSurveyResponseByIDAsync()
        {
            throw new NotImplementedException();
        }
    }
}
