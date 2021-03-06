﻿using Microsoft.EntityFrameworkCore;
using SharkTank.Data.Entities;
using SharkTank.Logic.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using YuleLog = SharkTank.Logic.Objects.Base_Objects.Logging.YuleLog;
using Category = SharkTank.Logic.Objects.Base_Objects.Logging.Category;

namespace SharkTank.Data.Repository
{
    public class Repository : IRepository
    {
        private readonly SantaPoneCentralDatabaseContext santaContext;

        public Repository(SantaPoneCentralDatabaseContext _context)
        {
            santaContext = _context ?? throw new ArgumentNullException(nameof(_context));
        }

        #region Category
        public async Task<List<Category>> GetAllCategories()
        {
            return (await santaContext.Categories.ToListAsync()).Select(Mapper.MapCategory).ToList();
        }
        #endregion

        #region Yule Log
        public async Task CreateNewLogEntry(YuleLog newLog)
        {
            Data.Entities.YuleLog contextLog = Mapper.MapLog(newLog);
            await santaContext.YuleLogs.AddAsync(contextLog);
        }

        public async Task<List<YuleLog>> GetAllLogEntries()
        {
            List<YuleLog> logicLogList = (await santaContext.YuleLogs
                .Include(yl => yl.Category)
                .ToListAsync())
                .Select(Mapper.MapLog)
                .ToList();
            return logicLogList;
        }

        public async Task<YuleLog> GetLogByID(Guid logID)
        {
            YuleLog logicLog = Mapper.MapLog(await santaContext.YuleLogs.FirstOrDefaultAsync(yl => yl.LogId == logID));
            return logicLog;
        }

        public async Task<List<YuleLog>> GetLogsByCategoryID(Guid categoryID)
        {
            List<YuleLog> logicLogList = (await santaContext.YuleLogs
                .Include(yl => yl.Category)
                .Where(yl => yl.CategoryId == categoryID)
                .ToListAsync())
                .Select(Mapper.MapLog)
                .ToList();
            return logicLogList;
        }
        #endregion

        #region Utility
        public async Task SaveAsync()
        {
            await santaContext.SaveChangesAsync();
        }
        #endregion

    }
}
