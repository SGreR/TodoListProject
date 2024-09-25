using Microsoft.EntityFrameworkCore;
using TodoListProject.Business.Models;

namespace TodoListProject.Infrastructure.Data
{
    public class ApplicationDbContext : DbContext
    { 
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<TaskItem>? TaskItems { get; set; }
    }
}
