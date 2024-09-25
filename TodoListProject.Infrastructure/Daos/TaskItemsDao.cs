using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TodoListProject.Business.Interfaces;
using TodoListProject.Business.Models;
using TodoListProject.Infrastructure.Data;

namespace TodoListProject.Infrastructure.Daos
{
    public class TaskItemsDao : IDao<TaskItem, TaskItemFilter>
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

        public async Task<IEnumerable<TaskItem>> GetAllAsync(TaskItemFilter filters)
        {
            try
            {
                IQueryable<TaskItem> query = _context.TaskItems.AsQueryable();
                if (!string.IsNullOrEmpty(filters.Title))
                {
                    query = query.Where(t => t.Title.Contains(filters.Title));
                }
                if (!string.IsNullOrEmpty(filters.Description))
                {
                    query = query.Where(t => t.Description.Contains(filters.Description));
                }
                if (filters.Created != null && filters.Created != DateTime.MinValue)
                {
                    query = query.Where(t => 
                    t.CreatedAt.Date.Year == filters.Created.Value.Date.Year && 
                    t.CreatedAt.Date.Month == filters.Created.Value.Date.Month &&
                    t.CreatedAt.Date.Day == filters.Created.Value.Date.Day);
                }
                return await query.ToListAsync();
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
