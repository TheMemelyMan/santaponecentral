﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Message.Logic.Objects.Base_Objects
{
    public class Note
    {
        public Guid noteID { get; set; }
        public string noteSubject { get; set; }
        public string noteContents { get; set; }
    }
}
