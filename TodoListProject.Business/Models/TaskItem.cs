using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TodoListProject.Business.Models
{
    public class TaskItem
    {
        public int Id {  get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public bool IsCompleted { get; set; }
        public DateTime CreatedAt { get; private set; }

        public TaskItem(int id, string title, string description, bool isCompleted)
        {
            Id = id;
            Title = title;
            Description = description;
            IsCompleted = isCompleted;
            CreatedAt = DateTime.Now;
        }


    }
}
