﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.IIS.Core;
using Microsoft.AspNetCore.SignalR;
using Santa.Api.Models.Message_Models;
using Santa.Api.SendGrid;
using Santa.Logic.Interfaces;

namespace Santa.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class MessageController : ControllerBase
    {
        private readonly IRepository repository;
        private readonly IMailbag mailbag;

        public MessageController(IRepository _repository, IMailbag _mailbag)
        {
            repository = _repository ?? throw new ArgumentNullException(nameof(_repository));
            mailbag = _mailbag ?? throw new ArgumentNullException(nameof(_mailbag));

        }
        // GET: api/Message
        /// <summary>
        /// Gets all messages sent in DB
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Authorize(Policy = "read:messages")]
        public async Task<ActionResult<List<Logic.Objects.Message>>> GetAllMessages()
        {
            try
            {
                return Ok(await repository.GetAllMessages());
            }
            catch (Exception e)
            {
                throw e.InnerException;
            }
        }

        // GET: api/Message/5
        /// <summary>
        /// Gets certain message by ID
        /// </summary>
        /// <param name="messageID"></param>
        /// <returns></returns>
        [HttpGet("{chatMessageID}", Name = "Get")]
        [Authorize(Policy = "read:messages")]
        public async Task<ActionResult<Logic.Objects.Message>> GetMessage(Guid chatMessageID)
        {
            try
            {
                return Ok(await repository.GetMessageByIDAsync(chatMessageID));
            }
            catch(Exception e)
            {
                throw e.InnerException;
            }
        }

        // POST: api/Message
        [HttpPost]
        [Authorize(Policy = "create:messages")]
        public async Task<ActionResult<Logic.Objects.Message>> PostMessage([FromBody, Bind("messageSenderClientID, messageRecieverClientID, messageContent, clientRelationXrefID")] ApiMessage message)
        {
            try
            {
#warning clients and admins can both use this. Ensure that the requesting client is only posting as a sender and that they are allowed to and such based on their token claims
                Logic.Objects.Message logicMessage = new Logic.Objects.Message()
                {
                    chatMessageID = Guid.NewGuid(),
                    recieverClient = new Logic.Objects.ClientMeta()
                    {
                        clientId = message.messageRecieverClientID
                    },
                    senderClient = new Logic.Objects.ClientMeta()
                    {
                        clientId = message.messageSenderClientID
                    },
                    clientRelationXrefID = message.clientRelationXrefID,
                    messageContent = message.messageContent,
                    dateTimeSent = DateTime.UtcNow,
                    isMessageRead = false,
                };
                if (logicMessage.recieverClient.clientId == null && logicMessage.senderClient.clientId == null)
                {
                    return StatusCode(StatusCodes.Status400BadRequest);
                }
                else
                {
                    await repository.CreateMessage(logicMessage);
                    await repository.SaveAsync();

                    if(logicMessage.recieverClient.clientId.HasValue)
                    {
                        Logic.Objects.MessageHistory history = logicMessage.clientRelationXrefID != null ? await repository.GetChatHistoryByClientIDAndRelationXrefIDAsync(logicMessage.recieverClient.clientId.Value, logicMessage.clientRelationXrefID.Value) : await repository.GetGeneralChatHistoryByClientIDAsync(logicMessage.recieverClient.clientId.Value);
                        await mailbag.sendChatNotificationEmail(await repository.GetClientByIDAsync(logicMessage.recieverClient.clientId.Value), history.eventType);
                    }

                    return Ok();
                }
            }
            catch (Exception e)
            {
                throw e.InnerException;
            }
        }

        // PUT: api/Message/5
        [HttpPut("{chatMessageID}/Read")]
        [Authorize(Policy = "update:messages")]
        public async Task<ActionResult<Logic.Objects.Message>> PutDescription(Guid chatMessageID, [FromBody, Bind("isMessageRead")] ApiMessageRead message)
        {
            try
            {
#warning clients and admins can use this controller. Ensure that if a client, then it is only changing a message they themselves have written
                Logic.Objects.Message targetMessage = await repository.GetMessageByIDAsync(chatMessageID);
                targetMessage.isMessageRead = message.isMessageRead;
                try
                {
                    await repository.UpdateMessageByIDAsync(targetMessage);
                    await repository.SaveAsync();
                    return Ok(await repository.GetMessageByIDAsync(chatMessageID));
                }
                catch (Exception e)
                {
                    throw e.InnerException;
                }
            }

            catch (Exception e)
            {
                throw e.InnerException;
            }
        }
    }
}
