using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TodoListProject.Business.Interfaces
{
    public interface IDao<T, F>
    {
        Task<IEnumerable<T>> GetAllAsync(F filters);
        Task<T?> GetByIdAsync(int id);
        Task<T> AddAsync(T entity);
        Task<T> UpdateAsync(T entity);
        Task<int> DeleteAsync(int id);
    }
}
