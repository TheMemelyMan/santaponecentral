﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Santa.Api.Models.Client_Models
{
    public class EditClientStatusModel
    {
        public Guid clientStatusID { get; set; }
        public bool wantsAccount { get; set; }
    }
}
