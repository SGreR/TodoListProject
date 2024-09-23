using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TodoListProject.Business.Interfaces;
using TodoListProject.Business.Models;
using TodoListProject.Infrastructure.Data;

namespace TodoListProject.Infrastructure.Daos
{
    public class TaskItemsDao : IDao<TaskItem>
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<TaskItemsDao> _logger;

        public TaskItemsDao(ApplicationDbContext context, ILogger<TaskItemsDao> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<TaskItem> AddAsync(TaskItem entity)
        {
            try
            {
                _context.Add(entity);
                await _context.SaveChangesAsync();
                return entity;
            }
            catch(DbUpdateException dbEx)
            {
                _logger.LogError(dbEx.Message);
                throw new Exception(dbEx.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw;
            }
        }

        public async Task<int> DeleteAsync(int id)
        {
            try
            {
                var entity = await GetByIdAsync(id);
                _context.Remove(entity);
                return await _context.SaveChangesAsync();
            }
            catch (DbUpdateException dbEx)
            {
                _logger.LogError(dbEx.Message);
                throw new Exception(dbEx.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw;
            }
        }

        public async Task<IEnumerable<TaskItem>> GetAllAsync()
        {
            try
            {
                return await _context.TaskItems.ToListAsync();
            }
            catch (DbUpdateException dbEx)
            {
                _logger.LogError(dbEx.Message);
                throw new Exception(dbEx.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw;
            }
        }

        public async Task<TaskItem?> GetByIdAsync(int id)
        {
            try
            {
                return await _context.TaskItems.FirstOrDefaultAsync(n => n.Id == id);
            }
            catch (DbUpdateException dbEx)
            {
                _logger.LogError(dbEx.Message);
                throw new Exception(dbEx.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw;
            }
        }

        public async Task<TaskItem> UpdateAsync(TaskItem entity)
        {
            try
            {
                _context.Update(entity);
                await _context.SaveChangesAsync();
                return entity;
            }
            catch (DbUpdateException dbEx)
            {
                _logger.LogError(dbEx.Message);
                throw new Exception(dbEx.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw;
            }
        }
    }
}
