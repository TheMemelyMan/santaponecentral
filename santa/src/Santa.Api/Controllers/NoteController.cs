﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Santa.Api.Models.Note_Models;
using Santa.Logic.Interfaces;
using Santa.Logic.Objects.Base_Objects;

namespace Santa.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NoteController : ControllerBase
    {
        private readonly IRepository repository;

        public NoteController(IRepository _repository)
        {
            repository = _repository ?? throw new ArgumentNullException(nameof(_repository));
        }

        // GET: api/Note
        [HttpGet]
        [Authorize(Policy = "read:clients")]
        public async Task<ActionResult<List<Note>>> Get()
        {
            return Ok(await repository.GetAllNotesAsync());
        }

        // GET: api/Note/5
        [HttpGet("{id}")]
        [Authorize(Policy = "read:clients")]
        public async Task<ActionResult<Note>> Get(Guid noteID)
        {
            return Ok(await repository.GetNoteByIDAsync(noteID));
        }

        // POST: api/Note
        [HttpPost]
        [Authorize(Policy = "update:clients")]
        public async Task<ActionResult<Note>> Post([FromBody] NewNoteModel model)
        {
            Note newLogicNote = new Note()
            {
                noteID = Guid.NewGuid(),
                noteSubject = model.noteSubject,
                noteContents = model.noteContents
            };
            await repository.CreateNoteAsync(newLogicNote);
            await repository.SaveAsync();
            return Ok(await repository.GetNoteByIDAsync(newLogicNote.noteID));
        }

        // PUT: api/Note/5
        [HttpPut("{id}")]
        [Authorize(Policy = "update:clients")]
        public async Task<ActionResult<Note>> Put(Guid noteID, [FromBody] EditNoteContentsModel model)
        {
            Note logicNote = await repository.GetNoteByIDAsync(noteID);
            logicNote.noteContents = model.noteContents;
            await repository.UpdateNote(logicNote);
            await repository.SaveAsync();
            return Ok(await repository.GetNoteByIDAsync(noteID));
        }

        // DELETE: api/Note/5
        [HttpDelete("{id}")]
        [Authorize(Policy = "update:clients")]
        public async Task<ActionResult> Delete(Guid noteID)
        {
            await repository.DeleteNoteByID(noteID);
            await repository.SaveAsync();
            return NoContent();
        }
    }
}