﻿using Client.Logic.Interfaces;
using Client.Logic.Models.Status_Models;
using Client.Logic.Objects;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Santa.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatusController : ControllerBase
    {
        private readonly IRepository repository;
        public StatusController(IRepository _repository)
        {
            repository = _repository ?? throw new ArgumentNullException(nameof(_repository));
        }
        // GET: api/Status
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<List<Status>>> GetAllClientStatus()
        {
            try
            {
                return Ok(await repository.GetAllClientStatus());
            }
            catch (Exception e)
            {
                throw e.InnerException;
            }
        }

        // GET: api/Status/5
        [HttpGet("{clientStatusID}")]
        [AllowAnonymous]
        public async Task<ActionResult<Status>> GetClientStatusByID(Guid clientStatusID)
        {
            try
            {
                return Ok(await repository.GetClientStatusByID(clientStatusID));
            }
            catch (Exception e)
            {
                throw e.InnerException;
            }
        }
        // GET: api/Status/Check/email
        [HttpGet("Check/{email}")]
        [AllowAnonymous]
        public async Task<ActionResult<Status>> GetClientStatusByEmail(string email)
        {
            try
            {
                return Ok((await repository.GetClientByEmailAsync(email)).clientStatus);
            }
            catch (Exception e)
            {
                return Ok(new Status()
                {
                    statusDescription = "Not Found"
                });
            }
        }


        // POST: api/Status
        [HttpPost]
        [Authorize("create:statuses")]
        public async Task<ActionResult<Status>> PostStatus([FromBody, Bind("statusDescription")] ApiStatusDescription clientStatus)
        {
            try
            {
                Client.Logic.Objects.Status newStatus = new Client.Logic.Objects.Status()
                {
                    statusID = Guid.NewGuid(),
                    statusDescription = clientStatus.statusDescription
                };
                try
                {
                    await repository.CreateStatusAsync(newStatus);
                    await repository.SaveAsync();
                    return Ok(newStatus);
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

        // PUT: api/Status/5
        [HttpPut("{clientStatusID}")]
        [Authorize("modify:statuses")]

        public async Task<ActionResult<Status>> Put(Guid clientStatusID, [FromBody, Bind("statusDescription")] ApiStatusDescription changedStatus)
        {
            try
            {
                try
                {
                    Status targetStatus = await repository.GetClientStatusByID(clientStatusID);
                    targetStatus.statusDescription = changedStatus.statusDescription;

                    await repository.UpdateStatusByIDAsync(targetStatus);
                    await repository.SaveAsync();
                    return Ok(await repository.GetClientStatusByID(clientStatusID));
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

        // DELETE: api/Status/5
        [HttpDelete("{clientStatusID}")]
        [Authorize("delete:statuses")]
        public async Task<ActionResult<Status>> Delete(Guid clientStatusID)
        {
            try
            {
                await repository.DeleteStatusByIDAsync(clientStatusID);
                await repository.SaveAsync();
                return NoContent();
            }
            catch (Exception e)
            {
                throw e.InnerException;
            }
        }
    }
}
