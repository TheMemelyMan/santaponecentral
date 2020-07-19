﻿using Microsoft.Extensions.Configuration;
using Microsoft.VisualStudio.Web.CodeGeneration.Contracts.Messaging;
using Santa.Api.Models.Auth0_Response_Models;
using Santa.Api.Models.Mailbag_Models;
using Santa.Logic.Objects;
using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Santa.Api.SendGrid
{
    public class Mailbag : IMailbag
    {
        private IConfigurationRoot ConfigRoot;
        private string url = string.Empty;
        private const string appEmail = "mailbag@santaponecentral.com";

        private const string emailStart = @"
                <html>
                <head>
                <style type='text / css'>
                </style>
                </head>

                <body>
                    <div style='width: 100%; text-align: center;'>
                        <img src='https://derpicdn.net/img/2020/6/10/2370933/large.png' alt='TotallyNotAShark' style='margin-left: auto; margin-right: auto; width: 200px;'>";
        private const string emailEnd = @"
                    </div>
                </body>

                </html>";

        public Mailbag(IConfiguration configRoot)
        {
            ConfigRoot = (IConfigurationRoot)configRoot;
            url = ConfigRoot["SendgridAPI:emailURL"];
        }
        public MailbagKeyModel getKey()
        {
            return new MailbagKeyModel()
            {
                key = ConfigRoot["SendgridAPI:SendgridAPIKey"]
            };
        }

        public async Task sendPasswordResetEmail(string recipientEmail, string recipientNickname, Auth0TicketResponse ticket, bool isNewUser)
        {
            SendGridClient client = new SendGridClient(getKey().key);
            EmailAddress from = new EmailAddress(appEmail, "SantaPone Central");
            string subject = "SantaPone Central Login Information";
            EmailAddress to = new EmailAddress(recipientEmail, recipientNickname);
            string plainTextContent = string.Empty;
            string htmlContent = string.Empty;
            if (isNewUser)
            {
                plainTextContent = "Agent, it's time to bring the cheer, and you've been approved for the cause! Follow the link here to set your password: " + ticket.ticket + "\nOnce you have it set, login at " + url;
                htmlContent = emailStart +
                    @$"
                    <p>Agent, it's time to bring the cheer, and you've been approved for the cause! Follow the link here to set your password: <a href='{ticket.ticket}'>Set your password</a></p>
                    <br>
                    <p>Once you've done that, log into your account at <a href='{url}'>SantaPone Central</a></p>
                    <br>
                    <p><strong>Santa Authorization and Networking Telecommunication Administration</strong></p>"

                    + emailEnd;
            }
            else
            {
                plainTextContent = "Agent, A change to your username, or a request to change your password has been made. Use this link to reset your password: " + ticket.ticket + "\nOnce you have it set, login at " + url + 
                    "If you did not make this request, reach out to the admins in your General Correspondence tab on your profile, or mlpsantapone@gmail.com!";
                htmlContent = emailStart +
                    @$"
                    <p>Agent, A change to your username, or a request to change your password has been made. Use this link to reset your password: <a href='{ticket.ticket}'>Password Reset</a></p>
                    <br>
                    <p>Once you've done that, log into your account at <a href='{url}'>SantaPone Central</a></p>
                    <p>If you did not make this request, reach out to the admins in your General Correspondence tab on your profile, or mlpsantapone@gmail.com!</p>
                    <br>
                    <p><strong>Santa Authorization and Networking Telecommunication Administration</strong></p>"
                    + emailEnd;
            }
            

            SendGridMessage msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = await client.SendEmailAsync(msg);
        }

        public async Task sendChatNotificationEmail(Logic.Objects.Client recipient, Logic.Objects.Event eventType)
        {
            SendGridClient client = new SendGridClient(getKey().key);
            EmailAddress from = new EmailAddress(appEmail, "SantaPone Central");
            string subject = "SantaPone Central Notification";
            EmailAddress to = new EmailAddress(recipient.email, recipient.nickname);
            string plainTextContent = "";
            string htmlContent = "";
            if (!string.IsNullOrWhiteSpace(eventType.eventDescription))
            {
                plainTextContent = $"You have recieved message for an assignment in the {eventType.eventDescription}, agent! Log into {url} to view it!";
                htmlContent = emailStart +
                    @$"
                    <p>You have recieved message for an assignment in the {eventType.eventDescription}, agent! Log into <a href='{url}'>SantaPone Central</a> to view it!</p>
                    <br>
                    <p>Over and Out,</p>
                    <p><strong>Pretty Online Notification Equines</strong></p>"
                    + emailEnd;
            }
            else
            {
                plainTextContent = $"You have recieved a message in your general correspondence, agent! Log into {url} to view it!";
                htmlContent = emailStart +
                    @$"
                    <p>You have recieved a message in your general correspondence, agent! Log into <a href='{url}'>SantaPone Central</a> to view it!</p>
                    <br>
                    <p>Over and Out</p>
                    <p><strong>Pretty Online Notification Equines</strong></p>"
                    + emailEnd;
            }

            if(!string.IsNullOrWhiteSpace(plainTextContent) && !string.IsNullOrWhiteSpace(htmlContent))
            {
                SendGridMessage msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
                var response = await client.SendEmailAsync(msg);
            }
            else
            {
                throw new Exception("Email content is invalid for sending chat notification");
            }
        }

        public async Task sendDeniedEmail(Client recipient)
        {
            SendGridClient client = new SendGridClient(getKey().key);
            EmailAddress from = new EmailAddress(appEmail, "SantaPone Central");
            string subject = "SantaPone Central Login Information";
            EmailAddress to = new EmailAddress(recipient.email, "Anon");
            string plainTextContent = "Unfortunately, you were not approved for the Secret Santa event. If you feel this is a mistake, or wish to make an appeal, feel free to reach out to mlpsantapone@gmail.com.";
            string htmlContent = emailStart +
                @$"
                    <p>Unfortunately, you were not approved for the Secret Santa event.</p>
                    <br>
                    <p>If you feel this is a mistake, or wish to make an appeal, feel free to reach out to mlpsantapone@gmail.com</p>
                    <br>
                    <p>Over and Out</p>
                    <p><strong>Pretty Online Notification Equines</strong></p>"
                + emailEnd;

            SendGridMessage msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = await client.SendEmailAsync(msg);
        }
        public async Task sendUndeniedEmail(Client recipient)
        {
            SendGridClient client = new SendGridClient(getKey().key);
            EmailAddress from = new EmailAddress(appEmail, "SantaPone Central");
            string subject = "SantaPone Central Login Information";
            EmailAddress to = new EmailAddress(recipient.email, "Anon");
            string plainTextContent = "After consideration, you were approved to join the Secret Santa Event! Check your email, as you should have recieved a second email with instructions to log in. " +
                "If you have any questions, feel free to reach out to the admins under your profile's General Correspondence section!";
            string htmlContent = emailStart +
                @$"
                    <p>After consideration, you were approved to join the Secret Santa Event! Check your email, as you should have recieved a second email with instructions to log in.</p>
                    <br>
                    <p>If you have any questions, feel free to reach out to the admins under your profile's General Correspondence section!</p>
                    <br>
                    <p>Over and Out</p>
                    <p><strong>Pretty Online Notification Equines</strong></p>"
                + emailEnd;

            SendGridMessage msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = await client.SendEmailAsync(msg);
        }

        public async Task sendAssignedRecipientEmail(Client recipient, Event eventType)
        {
            SendGridClient client = new SendGridClient(getKey().key);
            EmailAddress from = new EmailAddress(appEmail, "SantaPone Central");
            string subject = "SantaPone Central New Assignment";
            EmailAddress to = new EmailAddress(recipient.email, recipient.nickname);
            string plainTextContent = $"You have been given your assignment(s) for the {eventType.eventDescription} event! If you have any questions, feel free to reach out to the admins under your profile's General Correspondence section!";
            string htmlContent = emailStart +
                @$"
                    <p>You have been given your assignment(s) for the {eventType.eventDescription} event!</p>
                    <br>
                    <p>If you have any questions, feel free to reach out to the admins under your profile's General Correspondence section!</p>
                    <br>
                    <p>Over and Out</p>
                    <p><strong>Pretty Online Notification Equines</strong></p>"
                + emailEnd;

            SendGridMessage msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = await client.SendEmailAsync(msg);
        }
    }
}
