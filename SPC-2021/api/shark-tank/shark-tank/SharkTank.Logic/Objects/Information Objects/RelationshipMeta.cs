﻿using System;
using System.Collections.Generic;
using System.Text;

namespace SharkTank.Logic.Objects
{
    public class RelationshipMeta
    {
        public Guid clientRelationXrefID { get; set; }
        public ClientMeta relationshipClient { get; set; }
        public Event eventType { get; set; }
        public AssignmentStatus assignmentStatus { get; set; }
        public List<Tag> tags { get; set; }
        public bool removable { get; set; }
    }
}
