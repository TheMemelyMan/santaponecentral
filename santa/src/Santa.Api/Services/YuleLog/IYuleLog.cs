﻿using Santa.Logic.Objects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Santa.Api.Services.YuleLog
{
    public interface IYuleLog
    {
        Task logGetAllClients(Client requestingClient);
        Task logGetProfile(Client requestingClient, Profile returnedProfile);
        Task logChangedAnswer(Client requestingClient, Question questionBeingAnsweredFor, Response oldAnswer, Response newAnswer);
        Task logChangedAssignmentStatus(Client requestingClient, string assignmentNickname, AssignmentStatus oldStatus, AssignmentStatus newStatus);
        Task logError(Client requestingClient, string category);
    }
}
