﻿using Microsoft.Extensions.Logging;
using TodoListProject.Business.Interfaces;
using TodoListProject.Business.Models;

namespace TodoListProject.Infrastructure.Repositories
{
    public class TaskItemsRepository : IRepository<TaskItem, TaskItemFilter>
    {
        private readonly IDao<TaskItem, TaskItemFilter> _taskItemsDao;
        private readonly ILogger<TaskItemsRepository> _logger;

        public TaskItemsRepository(IDao<TaskItem, TaskItemFilter> taskItemsDao, ILogger<TaskItemsRepository> logger)
        {
            _taskItemsDao = taskItemsDao;
            _logger = logger;
        }

        public async Task<TaskItem> Add(TaskItem entity)
        {
            try
            {
                return await _taskItemsDao.AddAsync(entity);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw new Exception(ex.Message);
            }
        }

        public async Task<int> Delete(int id)
        {
            try
            {
                return await _taskItemsDao.DeleteAsync(id);

            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw new Exception(ex.Message);
            }
        }

        public async Task<IEnumerable<TaskItem>> GetAll(TaskItemFilter filters)
        {
            try
            {
                return await _taskItemsDao.GetAllAsync(filters);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw new Exception(ex.Message);
            }
        }

        public async Task<TaskItem?> GetById(int id)
        {
            try
            {
                return await _taskItemsDao.GetByIdAsync(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw new Exception(ex.Message);
            }

        }

        public async Task<TaskItem> Update(int id, TaskItem entity)
        {
            try
            {
                var oldTaskItem = await _taskItemsDao.GetByIdAsync(id);

                oldTaskItem.Title = entity.Title;
                oldTaskItem.Description = entity.Description;
                oldTaskItem.IsCompleted = entity.IsCompleted;

                return await _taskItemsDao.UpdateAsync(oldTaskItem);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw new Exception(ex.Message);
            }
        }
    }
}
