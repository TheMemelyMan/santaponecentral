﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Message.Logic.Objects
{
    public class EntryType
    {
        public Guid entryTypeID { get; set; }
        public string entryTypeName { get; set; }
        public string entryTypeDescription { get; set; }
        public bool adminOnly { get; set; }
    }
}
