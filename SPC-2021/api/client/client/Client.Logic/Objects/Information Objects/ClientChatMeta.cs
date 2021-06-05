﻿using System;

namespace Client.Logic.Objects.Information_Objects
{
    public class ClientChatMeta
    {
        public Guid? clientId { get; set; }
        public string clientNickname { get; set; }
        public bool hasAccount { get; set; }
        public bool isAdmin { get; set; }
    }
}
