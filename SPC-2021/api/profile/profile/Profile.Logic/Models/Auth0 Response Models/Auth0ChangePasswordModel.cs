﻿namespace Profile.Logic.Models.Auth0_Response_Models
{
    public class Auth0ChangePasswordModel
    {
        public string email { get; set; }
        public string connection_id { get; set; }
        public bool mark_email_as_verified { get; set; }
        public bool includeEmailInRedirect { get; set; }
    }
}
