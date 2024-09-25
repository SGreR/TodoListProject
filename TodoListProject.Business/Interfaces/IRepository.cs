namespace TodoListProject.Business.Interfaces
{
    public interface IRepository<T, F>
    {
        Task<IEnumerable<T>> GetAll(F filters);
        Task<T?> GetById(int id);
        Task<T> Add(T entity);
        Task<T> Update(int id, T entity);
        Task<int> Delete(int id);
    }
}
